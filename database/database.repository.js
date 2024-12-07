const AppException = require('../exceptions/exception.app');
const database = require('./database.connection');

class Repository {
  constructor(tableName) {
    if (!tableName) {
      throw new AppException('Table name is required for Repository', 500);
    }
    this.tableName = tableName;
  }

  async save(data) {
    throw new AppException(
      "Method 'save()' must be implemented in a subclass",
      500
    );
  }

  async findAll() {
    try {
      const [records] = await database.query(`SELECT * FROM ${this.tableName}`);
      return records;
    } catch (error) {
      throw new AppException(error, 500);
    }
  }

  async findById(id) {
    try {
      const [record] = await database.query(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id]
      );
      return record[0];
    } catch (error) {
      throw new AppException(error, 500);
    }
  }

  async updateById(id, data) {
    throw new AppException(
      "Method 'updateById()' must be implemented in a subclass",
      500
    );
  }

  async deleteById(id) {
    try {
      await database.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    } catch (error) {
      throw new AppException(error, 500);
    }
  }

  async deleteAll(ids) {
    try {
      const placeholders = ids.map(() => '?').join(',');
      await database.query(
        `DELETE FROM ${this.tableName} WHERE id IN (${placeholders})`,
        ids
      );
    } catch (error) {
      throw new AppException(error, 500);
    }
  }
}

module.exports = Repository;
