const express = require('express');
const morgan = require('morgan');
const AppException = require('./exceptions/exception.app');
const globalExceptionHandler = require('./exceptions/exception.global');

const userRouter = require('./routes/route.user');
const blogRouter = require('./routes/route.blog');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/blogs', blogRouter);

app.all('*', (req, res, next) => {
  next(
    new AppException(`Cannot find this ${req.originalUrl} on the server`, 404)
  );
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(globalExceptionHandler);
module.exports = app;
