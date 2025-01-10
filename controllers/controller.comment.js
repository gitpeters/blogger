const CommentService = require('../services/service.comment');

class CommentController {
  constructor() {}

  async createComment(req, res) {
    req.body.userId = req.user.id;
    req.body.postId = req.params.postId * 1;
    req.body.commentedBy = req.user.firstName;
    const comment = await CommentService.createComment(req.body);
    res.status(201).json({
      status: 'success',
      data: { comment },
    });
  }

  async getAllPostComments(req, res) {
    const comments = await CommentService.getAllPostComments(req.params.postId);
    res.status(200).json({
      status: 'success',
      result: comments.length,
      data: {
        comments,
      },
    });
  }

  async updateComment(req, res) {
    const updatedComment = await CommentService.updateComment(
      req.params.postId,
      req.params.commentId,
      req.user.id,
      req.body
    );
    res.status(200).json({
      status: 'success',
      data: { updatedComment },
    });
  }

  async deleteComment(req, res) {
    await CommentService.deleteComment(req.params.commentId);
    res.status(201).json({});
  }

  async replyToComment(req, res) {
    req.body.repliedBy = req.user.firstName;
    const comment = await CommentService.replyComment(
      req.params.postId,
      req.params.commentId,
      req.body
    );
    res.status(200).json({
      status: 'success',
      data: { comment },
    });
  }
}

module.exports = new CommentController();
