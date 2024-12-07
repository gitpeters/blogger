const AppException = require('../exceptions/exception.app');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('image');

exports.uploadImageToCloudinary = async fileBuffer => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'uploads',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
            transformation: [{ width: 850, height: 680, crop: 'limit' }],
          },
          (error, result) => {
            if (error) reject(new AppException(error.message, 500));
            resolve(result);
          }
        )
        .end(fileBuffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

exports.deleteImageFromCloudinary = async publicId => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      throw new AppException(
        `Failed to delete image with public ID: ${publicId}`,
        400
      );
    }
    console.log(`Image with public ID ${publicId} deleted successfully`);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw new AppException(error.message, 500);
  }
};
