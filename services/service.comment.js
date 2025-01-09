const { Comment } = require('../models/model.category');
const User = require('../models/model.user');
const Blog = require('../models/model.blog');
const AppException = require('../exceptions/exception.app');
const { where } = require('sequelize');

class CommentService {
  constructor() {}

  async createComment(data) {
    if (!data.postId) {
      throw new AppException('Comment must belong to a post', 400);
    }
    if (!data.content) {
      throw new AppException('A comment must have a content', 400);
    }
    return await Comment.create(data);
  }

  async getAllPostComments(postId) {
    return await Comment.findAll({
      where: { postId: postId },
      include: [
        { model: User, attributes: ['firstName', 'lastName'] },
        { model: Blog, attributes: ['title'] },
      ],
    });
  }

  async updateComment(postId, commentId, userId, data) {
    const [updated] = await Comment.update(
      { content: data.content },
      {
        where: { id: commentId, postId: postId, userId: userId },
      }
    );

    if (!updated) {
      throw new AppException(
        `No comment found belonging to this user: ${userId} and post: ${postId}`,
        404
      );
    }

    const updatedComment = await Comment.findOne({
      where: { id: commentId, postId: postId, userId: userId },
    });

    return updatedComment;
  }

  async deleteComment(commentId) {
    await Comment.destroy({ where: { id: commentId } });
  }

  async replyComment(postId, commentId, reply) {
    if (!commentId) {
      throw new AppException('Reply must belong to a comment', 400);
    }
    if (!reply) {
      throw new AppException('Cannot send empty reply message', 400);
    }
    const comment = await Comment.findOne(
      { where: { id: commentId, postId: postId } },
      {
        include: [
          { model: User, attributes: ['firstName', 'lastName'] },
          { model: Blog, attributes: ['name'] },
        ],
      }
    );
    if (!comment) {
      throw new AppException('No comment found by this ID', 404);
    }
    if (!comment.replies) {
      comment.replies = [];
    }
    comment.replies.push(reply);
    await comment.save();
    return comment;
  }
}

module.exports = new CommentService();
