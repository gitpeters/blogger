const express = require('express');

const cloudinaryService = require('../services/service.cloudinary');
const blogController = require('../controllers/controller.blog');
const AuthService = require('../services/service.auth');
const commentRouter = require('./route.comment');

const router = express.Router();

router.use('/:postId/comments', commentRouter);

router
  .route('/')
  .get(blogController.getAllPosts)
  .post(
    AuthService.protect,
    AuthService.restrictTo('AUTHOR'),
    cloudinaryService.upload,
    blogController.createPost
  );

router
  .route('/:id')
  .get(blogController.getPost)
  .patch(
    AuthService.protect,
    AuthService.restrictTo('AUTHOR'),
    cloudinaryService.upload,
    blogController.updatePost
  )
  .delete(
    AuthService.protect,
    AuthService.restrictTo('AUTHOR', 'ADMIN'),
    blogController.deletePost
  );

module.exports = router;
