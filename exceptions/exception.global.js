module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') console.error(err.message, err);
  const statusCode = !err.statusCode ? 500 : err.statusCode;
  res.status(statusCode).json({
    status: err.status,
    message: err.message,
    timeStamp: Date.now(),
  });

  next();
};
