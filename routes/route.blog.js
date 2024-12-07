const express = require('express');

const cloudinaryService = require('../services/service.cloudinary');
const blogController = require('../controllers/controller.blog');

const router = express.Router();

router
  .route('/upload')
  .post(cloudinaryService.upload, blogController.uploadImage);

module.exports = router;
