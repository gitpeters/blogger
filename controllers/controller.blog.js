const blogService = require('../services/service.blog');
const catchAsync = require('../utils/catch.async');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await blogService.getAllPost(req.query);
  res.status(200).json({
    status: 'success',
    result: posts.length,
    data: {
      posts,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await blogService.createPost(req);
  res.status(201).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const updatedPost = await blogService.updatePost(req.params.id, req);
  res.status(200).json({
    status: 'success',
    data: {
      updatedPost,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await blogService.getPost(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  await blogService.deletePost(req.params.id);
  res.status(204).json({
    status: 'success',
  });
});

exports.getUserPosts = catchAsync(async (req, res, next) => {
  const posts = await blogService.getUserPosts(req.params.userId);
  res.status(200).json({
    status: 'success',
    result: posts.length,
    data: { posts },
  });
});
