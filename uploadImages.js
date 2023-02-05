require('dotenv').config()
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

async function getImagesFromCloudinary(collectionName) {
    try {
      const result = await cloudinary.api.resources({ type: 'upload', max_results: 500, prefix: collectionName + '/' });
    //   console.log(result.resources)
      return result.resources;
    } catch (error) {
      console.error(error);
    }
  }


  module.exports = getImagesFromCloudinary