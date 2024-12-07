const Repository = require('./database.repository');
const database = require('./database.connection');
const AppException = require('../exceptions/exception.app');

class UserRepository extends Repository {
  constructor() {
    super('blogger.blogs');
  }

  async save(data) {
    try {
      const [result] = await database.query(
        `INSERT INTO ${this.tableName} (author_id, title, content, cover_image, image_public_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          data.authorId,
          data.title,
          data.content,
          data.coverImage,
          data.imagePublicId,
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
        `UPDATE ${this.tableName} SET author_id = ?, title = ?, content = ?, cover_image =?, image_public_id = ?, updated_at = ? 
         WHERE id = ?`,
        [
          data.authorId,
          data.title,
          data.content,
          data.coverImage,
          data.imagePublicId,
          data.updatedAt,
          id,
        ]
      );
      return await this.findById(id);
    } catch (err) {
      throw new AppException(err, 500);
    }
  }
}

module.exports = new UserRepository();
