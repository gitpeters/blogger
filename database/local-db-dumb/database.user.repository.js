const Repository = require('./database.repository');
const database = require('./database.connection');
const AppException = require('../../exceptions/exception.app');

class UserRepository extends Repository {
  constructor() {
    super('blogger.users');
  }

  async save(data) {
    try {
      const [result] = await database.query(
        `INSERT INTO ${this.tableName} (first_name, last_name, email, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?)`,
        [
          data.firstName,
          data.lastName,
          data.email,
          data.createdAt,
          data.updatedAt,
        ]
      );
      return await this.findById(result.insertId);
    } catch (err) {
      throw new AppException(err, 500);
    }
  }
  async updateById(id, data) {
    try {
      await database.query(
        `UPDATE ${this.tableName} SET first_name = ?, last_name = ?, email = ?, updated_at = ? 
         WHERE id = ?`,
        [data.firstName, data.lastName, data.email, data.updatedAt, id]
      );
      return await this.findById(id);
    } catch (err) {
      throw new AppException(err, 500);
    }
  }
}

module.exports = new UserRepository();
