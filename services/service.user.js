const User = require('../models/model.user');
const AppException = require('../exceptions/exception.app');
const dateFormatter = require('../utils/date.formatter');
const UserRepository = require('../database/database.user.repository');

class UserService {
  constructor() {}
  async createUser(data) {
    this.validateUserRequest(data);
    const userModel = new User(
      undefined,
      data.firstName,
      data.lastName,
      data.email
    );
    return await UserRepository.save(userModel);
  }

  async getAllUsers() {
    return await UserRepository.findAll();
  }

  async getUser(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new AppException('No user record found', 404);
    }
    return user;
  }

  async updateUser(id, data) {
    const dbUser = await UserRepository.findById(id);
    const user = mapUserTo(dbUser[0]);
    const updatedRecord = { ...user, ...data };
    return await UserRepository.updateById(id, updatedRecord);
  }

  async deleteUser(id) {
    await UserRepository.deleteById(id);
  }

  mapUserTo(record) {
    return {
      id: record.id,
      firstName: record.first_name,
      lastName: record.last_name,
      email: record.email,
      createdAt: record.created_at,
      updatedAt: dateFormatter(Date.now()),
    };
  }

  validateUserRequest(data) {
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
