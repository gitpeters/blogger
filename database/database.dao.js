const database = require('./database.connection');
const AppException = require('../exceptions/exception.app');

exports.createUserRecord = async User => {
  try {
    const [result] = await database.query(
      `INSERT INTO blogger.users (first_name, last_name, email, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
        `,
      [
        User.firstName,
        User.lastName,
        User.email,
        User.createdAt,
        User.updatedAt,
      ]
    );
    const [userRecord] = await database.query(
      `SELECT * FROM blogger.users WHERE id = ?`,
      [result.insertId]
    );

    return userRecord[0];
  } catch (err) {
    throw new AppException(err, 500);
  }
};

exports.findAllUsers = async () => {
  try {
    const [records] = await database.query('SELECT * FROM blogger.users');
    return records;
  } catch (error) {
    throw new AppException(error, 500);
  }
};

exports.findUserById = async id => {
  try {
    const [record] = await database.query(
      'SELECT * FROM blogger.users WHERE id = ?',
      [id]
    );
    return record;
  } catch (error) {
    throw new AppException(error, 500);
  }
};

exports.updateUserRecord = async (id, user) => {
  try {
    await database.query(
      `
          UPDATE blogger.users 
          SET first_name = ?, last_name = ?, email = ?, updated_at = ? 
          WHERE id = ?
        `,
      [user.firstName, user.lastName, user.email, user.updatedAt, id]
    );
    const [userRecord] = await database.query(
      `SELECT * FROM blogger.users WHERE id = ?`,
      [id]
    );
    return userRecord;
  } catch (err) {
    throw new AppException(err, 500);
  }
};

exports.deleteUser = async id => {
  try {
    await database.query('DELETE FROM blogger.users WHERE id =?', [id]);
  } catch (error) {
    throw new AppException(error, 500);
  }
};
