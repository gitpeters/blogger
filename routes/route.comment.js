const express = require('express');

const catchAsync = require('../utils/catch.async');
const authService = require('../services/service.auth');
const CommentController = require('../controllers/controller.comment');

const router = express.Router({ mergeParams: true });

router.use(authService.protect);

router
  .route('/')
  .post(
    authService.restrictTo('USER'),
    catchAsync(CommentController.createComment)
  )
  .get(catchAsync(CommentController.getAllPostComments));

router
  .route('/:commentId')
  .patch(catchAsync(CommentController.updateComment))
  .delete(
    authService.restrictTo('AUTHOR', 'ADMIN'),
    catchAsync(CommentController.deleteComment)
  );

router
  .route('/:commentId/reply')
  .post(catchAsync(CommentController.replyToComment));

module.exports = router;
