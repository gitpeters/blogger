const express = require('express');
const categoryController = require('../controllers/controller.category');
const AuthService = require('../services/service.auth');

const router = express.Router();
router.use(AuthService.protect, AuthService.restrictTo('AUTHOR'));

router
  .route('/')
  .post(categoryController.createPostCategory)
  .get(categoryController.getAllCategories);

module.exports = router;
