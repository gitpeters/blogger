const User = require('../models/model.user');
const AppException = require('../exceptions/exception.app');
const CreateUserRequest = require('../dtos/create.user.request');
const UpdateUserRequest = require('../dtos/update.user.request');
const pagination = require('../utils/pagination');
const AuthService = require('./service.auth');
const UserResponse = require('../dtos/user.response');
const { Op } = require('sequelize');

const {
  emailRegex,
  passwordRegex,
  phoneNumberRegex,
} = require('../utils/system.regex');

class UserService {
  constructor() {}

  async createUser(data, res) {
    const userRequest = new CreateUserRequest(
      data.firstName,
      data.lastName,
      data.email,
      data.phoneNumber,
      data.password
    );
    await this._validateUserRequest(userRequest);
    const user = await User.create(userRequest);
    const accessToken = AuthService.generateAccessToken(user);
    AuthService.setCookie(res, accessToken, 'accessToken');
    return this._mapUserToUserResponse(user);
  }

  async getAllUsers(query) {
    const { limit, offset } = pagination.paginate(query);
    const { count, rows } = await User.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    return rows
      .filter(user => user.role !== 'ADMIN')
      .map(user => this._mapUserToUserResponse(user));
  }

  async getUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppException('No user record found', 404);
    }
    return this._mapUserToUserResponse(user);
  }

  async updateUser(id, data) {
    const updateData = new UpdateUserRequest(
      data.firstName,
      data.lastName,
      data.phoneNumber
    );
    if (updateData.phone) {
      if (!phoneNumberRegex.test(updateData.phone))
        throw new AppException('Invalid phone number provided', 404);

      if (await User.findOne({ where: { phone: updateData.phone } })) {
        throw new AppException(
          'User phone number already taken. Please provide another phone number',
          404
        );
      }
    }

    await User.update(updateData, { where: { id: id } });
    const updatedUser = await User.findByPk(id);
    return this._mapUserToUserResponse(updatedUser);
  }

  async deleteUser(id) {
    await User.destroy({ where: { id: id } });
  }

  async findUserByEmailOrUsername(username) {
    return await User.findOne({
      where: {
        [Op.or]: [{ email: username }, { username: username }],
      },
    });
  }

  _mapUserToUserResponse(user, opt = {}) {
    return new UserResponse(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.phone,
      user.role,
      user.username,
      opt
    );
  }

  async _validateUserRequest(data) {
    if (!data.firstName)
      throw new AppException('User first name is required', 404);

    if (!data.lastName)
      throw new AppException('User last name is required', 404);

    if (!data.email) throw new AppException('User email is required', 404);

    if (!emailRegex.test(data.email))
      throw new AppException('Invalid email address provided', 404);

    if (!data.phone)
      throw new AppException('User phone number is required', 404);

    if (!phoneNumberRegex.test(data.phone))
      throw new AppException('Invalid phone number provided', 404);

    if (!data.password)
      throw new AppException('User password is required', 404);

    if (!passwordRegex.test(data.password)) {
      throw new AppException(
        'Please provide a stronger password. The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g., @$!%*?&).',
        404
      );
    }

    if (await User.findOne({ where: { email: data.email } })) {
      throw new AppException(
        'User email already taken. Please provide another email',
        404
      );
    }
    if (await User.findOne({ where: { phone: data.phone } })) {
      throw new AppException(
        'User phone number already taken. Please provide another phone number',
        404
      );
    }
  }
}

module.exports = new UserService();
