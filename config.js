require("dotenv").config();

module.exports = {
    port: process.env.PORT,
    cloudinaryCredentials: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    },
    dbUri: process.env.DB_URI
}