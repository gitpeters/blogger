const Category = require('../models/model.category');
const pagination = require('../utils/pagination');

class CategoryService {
  constructor() {}

  async createPostCategory(data) {
    return await Category.create(data);
  }

  async getAllCategories(query) {
    const { limit, offset } = pagination.paginate(query);
    const { count, rows } = await Category.findAndCountAll({
      where: {},
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
    });
    return rows;
  }
}

module.exports = new CategoryService();
