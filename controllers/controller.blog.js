const blogService = require('../services/service.blog');
const catchAsync = require('../utils/catch.async');

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await blogService.createPost(req);
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});
