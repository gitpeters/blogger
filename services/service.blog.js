const AppException = require('../exceptions/exception.app');
const cloudinaryService = require('./service.cloudinary');

exports.uploadImage = async req => {
  if (!req.file) {
    throw new AppException('No file uploaded. Kindly upload image file', 404);
  }
  const fileBuffer = req.file.buffer;
  return await cloudinaryService.uploadImageToCloudinary(fileBuffer);
};
