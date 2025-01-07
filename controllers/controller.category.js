const CategoryService = require('../services/service.category');
const catchAsync = require('../utils/catch.async');

exports.createPostCategory = catchAsync(async (req, res, next) => {
  const category = await CategoryService.createPostCategory(req.body);
  res.status(201).json({
    status: 'success',
    data: { category },
  });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const categories = await CategoryService.getAllCategories(req.query);
  res.status(200).json({
    status: 'success',
    result: categories.length,
    data: { categories },
  });
});
