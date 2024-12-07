const User = require('../models/model.user');
const AppException = require('../exceptions/exception.app');
const dateFormatter = require('../utils/date.formatter');
const UserRepository = require('../database/database.user.repository');

exports.createUser = async data => {
  const userModel = new User(
    undefined,
    data.firstName,
    data.lastName,
    data.email
  );
  return await UserRepository.save(userModel);
};

exports.findAllUsers = async () => {
  return await UserRepository.findAll();
};

exports.findByUser = async id => {
  const user = await UserRepository.findById(id);
  if (!user) {
    throw new AppException('No user record found', 404);
  }
  return user;
};

exports.updateUser = async (id, data) => {
  const dbUser = await UserRepository.findById(id);
  const user = mapUserTo(dbUser[0]);
  const updatedRecord = { ...user, ...data };
  return await UserRepository.updateById(id, updatedRecord);
};

exports.deleteUser = async id => {
  await UserRepository.deleteById(id);
};

const mapUserTo = record => {
  return {
    id: record.id,
    firstName: record.first_name,
    lastName: record.last_name,
    email: record.email,
    createdAt: record.created_at,
    updatedAt: dateFormatter(Date.now()),
  };
};
