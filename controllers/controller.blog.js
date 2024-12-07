const blogService = require('../services/service.blog');
const catchAsync = require('../utils/catch.async');

exports.uploadImage = catchAsync(async (req, res, next) => {
  const result = await blogService.uploadImage(req);
  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
});
