const userService = require('../services/service.user');
const catchAsync = require('../utils/catch.async');

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await userService.createUser(req.body, res);
  res.status(201).json({
    status: 'success',
    data: { user },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUsers(req.query);
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: { users },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await userService.getUser(req.params.id);
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await userService.updateUser(req.user.id, req.body);
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json({
    status: 'success',
  });
});
