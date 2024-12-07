const dao = require('../database/database.dao');
const User = require('../models/model.user');
const AppException = require('../exceptions/exception.app');
const dateFormatter = require('../utils/date.formatter');

exports.createUser = async data => {
  const userModel = new User(
    undefined,
    data.firstName,
    data.lastName,
    data.email
  );
  return await dao.createUserRecord(userModel);
};

exports.findAllUsers = async () => {
  return await dao.findAllUsers();
};

exports.findByUser = async id => {
  const user = await dao.findUserById(id);
  if (!user) {
    throw new AppException('No user record found', 404);
  }
  return user;
};

exports.updateUser = async (id, data) => {
  const dbUser = await this.findByUser(id);
  const user = mapUserTo(dbUser[0]);
  const updatedRecord = { ...user, ...data };
  return await dao.updateUserRecord(id, updatedRecord);
};

exports.deleteUser = async id => {
  await dao.deleteUser(id);
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
