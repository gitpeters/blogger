const express = require('express');

const catchAsync = require('../utils/catch.async');
const AuthController = require('../controllers/controller.auth');

const router = express.Router();

router.route('/login').post(catchAsync(AuthController.login));

module.exports = router;
