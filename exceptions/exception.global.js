module.exports = (err, req, res, next) => {
  console.log(err);
  const statusCode = !err.statusCode ? 500 : err.statusCode;
  res.status(statusCode).json({
    status: err.status,
    message: err.message,
    timeStamp: Date.now(),
  });

  next();
};
