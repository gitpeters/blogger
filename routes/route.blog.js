const express = require('express');

const cloudinaryService = require('../services/service.cloudinary');
const blogController = require('../controllers/controller.blog');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(blogController.getAllPosts)
  .post(cloudinaryService.upload, blogController.createPost);

router
  .route('/:id')
  .get(blogController.getPost)
  .patch(cloudinaryService.upload, blogController.updatePost)
  .delete(blogController.deletePost);

module.exports = router;
