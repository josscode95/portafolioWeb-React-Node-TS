export default{
  PORT: process.env.PORT || 4000,
  DB: process.env.MONGODB_CNN || '',
  KEY_JWT: process.env.KEY_JWT || '',
  CLOUD_IMG: process.env.CLOUDINARY_URL || ''
}