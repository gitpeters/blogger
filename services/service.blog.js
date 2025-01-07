const AppException = require('../exceptions/exception.app');
const Blog = require('../models/model.blog');
const cloudinaryService = require('./service.cloudinary');
const User = require('../models/model.user');
const Category = require('../models/model.category');
const pagination = require('../utils/pagination');
const { Op } = require('sequelize');

class BlogService {
  async createPost(data) {
    this._validateBlogRequest(data);
    const { url, publicId } = await this._uploadImage(data.file);

    const post = {
      ...data.body,
      coverImage: url,
      imagePublicId: publicId,
      userId: data.user.id,
    };
    if (data.categoryId) {
      const category = await Category.findByPk(data.categoryId);
      if (!category)
        throw new AppException('Invalid category id provided.', 403);
    }
    return await Blog.create(post);
  }

  async getAllPost(query) {
    let searchParam = null;
    if (query.searchKey) {
      searchParam = `%${query.searchKey}%`;
    }
    const { limit, offset } = pagination.paginate(query);
    const { count, rows } = await Blog.findAndCountAll({
      where: searchParam
        ? {
            [Op.or]: [
              {
                title: {
                  [Op.like]: searchParam,
                },
              },
              {
                content: {
                  [Op.like]: searchParam,
                },
              },
            ],
          }
        : {},
      include: [
        { model: User, attributes: ['firstName', 'lastName'] },
        {
          model: Category,
          attributes: ['name'],
          where: query.filter ? { name: query.filter } : {},
        },
      ],
      offset: offset,
      limit: limit,
      order: [['createdAt', 'DESC']],
    });
    return rows;
  }

  async getPost(id) {
    const post = await Blog.findByPk(id, {
      include: [
        { model: User, attributes: ['firstName', 'lastName'] },
        { model: Category, attributes: ['name'] },
      ],
    });
    if (!post) throw new AppException('No post record found', 404);
    return post;
  }

  async updatePost(id, data) {
    let imageUrl = undefined;
    let imagePublicId = undefined;
    if (data.file) {
      const { url, publicId } = await this._uploadImage(data.file);
      imageUrl = url;
      imagePublicId = publicId;
    }
    const update = {
      ...data.body,
      coverImage: imageUrl,
      imagePublicId: imagePublicId,
    };
    return await Blog.update(update, { where: { id: id } });
  }

  async deletePost(id) {
    const post = await this.getPost(id);
    await cloudinaryService.deleteImageFromCloudinary(post.image_public_id);
    await Blog.destroy({ where: { id: id } });
  }

  async getUserPosts(userId) {
    return await Blog.findAll({ where: { userId: userId } });
  }

  async _uploadImage(file) {
    const fileBuffer = file.buffer;
    return await cloudinaryService.uploadImageToCloudinary(fileBuffer);
  }

  _validateBlogRequest(data) {
    if (!data.body.title) throw new AppException('Blog title is required', 404);
    if (!data.body.content)
      throw new AppException('Blog content is required', 404);
    if (!data.file)
      throw new AppException('No file uploaded. Kindly upload image file', 404);
  }
}

module.exports = new BlogService();
