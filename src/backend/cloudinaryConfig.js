import { v2 as cloudinary } from 'cloudinary'
import dotnev from 'dotnev'

dotnev.congfig()
cloudinary.config({
  cloud_name: import.meta.env.VUE_APP_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VUE_APP_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VUE_APP_CLOUDINARY_API_SECRET,
  secure: true
})

export default cloudinary
