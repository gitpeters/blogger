const express = require('express');

const userController = require('../controllers/controller.user');
const blogController = require('../controllers/controller.blog');
const AuthService = require('../services/service.auth');

const router = express.Router();

router.use('/:userId/posts', blogController.getUserPosts);

router
  .route('/')
  .get(
    AuthService.protect,
    AuthService.restrictTo('ADMIN'),
    userController.getAllUsers
  )
  .post(userController.createUser)
  .patch(AuthService.protect, userController.updateUser);

router
  .route('/:id')
  .get(userController.getUser)
  .delete(
    AuthService.protect,
    AuthService.restrictTo('ADMIN'),
    userController.deleteUser
  );

module.exports = router;
