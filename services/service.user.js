const User = require('../models/model.user');
const AppException = require('../exceptions/exception.app');
const CreateUserRequest = require('../dtos/create.user.request');
const pagination = require('../utils/pagination');

class UserService {
  constructor() {}
  async createUser(data) {
    this._validateUserRequest(data);
    const userRequest = new CreateUserRequest(
      data.firstName,
      data.lastName,
      data.email
    );
    return await User.create(userRequest);
  }

  async getAllUsers(query) {
    const { limit, offset } = pagination.paginate(query);
    const { count, rows } = await User.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    return rows;
  }

  async getUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppException('No user record found', 404);
    }
    return user;
  }

  async updateUser(id, data) {
    return await User.update(data, { where: { id: id } });
  }

  async deleteUser(id) {
    await User.destroy({ where: { id: id } });
  }

  _validateUserRequest(data) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.firstName)
      throw new AppException('user first name is required', 404);
    if (!data.lastName)
      throw new AppException('user last name is required', 404);
    if (!data.email) throw new AppException('user email is required', 404);
    if (!emailRegex.test(data.email))
      throw new AppException('Invalid email address provided', 404);
  }
}

module.exports = new UserService();
