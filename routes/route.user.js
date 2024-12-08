const express = require('express');

const userController = require('../controllers/controller.user');
const blogController = require('../controllers/controller.blog');

const router = express.Router();

router.use('/:userId/posts', blogController.getUserPosts);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
