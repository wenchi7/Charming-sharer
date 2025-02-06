import express from 'express'
import multer from 'multer'
import cloudinary from './cloudinaryConfig.js'

const router = express.Router()
const upload = multer({ dest: 'uploads/' }) // 這裡 multer 只是暫存圖片，Cloudinary 上傳後就不需要了

// 上傳圖片 API
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // 把圖片上傳到 Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'charming_sharer', // 可以自己設定資料夾名稱
    })

    res.json({ imageUrl: result.secure_url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
