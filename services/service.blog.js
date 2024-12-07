const AppException = require('../exceptions/exception.app');
const Blog = require('../models/model.blog');
const BlogRepository = require('../database/database.blog.repository');
const UserService = require('./service.user');
const cloudinaryService = require('./service.cloudinary');

exports.uploadImage = async req => {
  if (!req.file) {
    throw new AppException('No file uploaded. Kindly upload image file', 404);
  }
  const fileBuffer = req.file.buffer;
  return await cloudinaryService.uploadImageToCloudinary(fileBuffer);
};

class BlogService {
  async createPost(data) {
    this.validateBlogRequest(data);
    const author = await UserService.getUser(data.body.authorId);
    const { url, publicId } = await this.uploadImage(data.file);

    const post = new Blog(
      undefined,
      author.id,
      data.body.title,
      data.body.content,
      url,
      publicId
    );
    return await BlogRepository.save(post);
  }

  async uploadImage(file) {
    const fileBuffer = file.buffer;
    return await cloudinaryService.uploadImageToCloudinary(fileBuffer);
  }

  validateBlogRequest(data) {
    if (!data.body.title) throw new AppException('Blog title is required', 404);
    if (!data.body.content)
      throw new AppException('Blog content is required', 404);
    if (!data.body.authorId)
      throw new AppException('Blog author is required', 404);
    if (!data.file)
      throw new AppException('No file uploaded. Kindly upload image file', 404);
  }
}

module.exports = new BlogService();
