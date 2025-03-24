import express from 'express'
import cors from 'cors'
import cloudinaryDeleteRouter from './CloudinaryDelete.js'

const app = express()
const port = 3000

// 启用 CORS
app.use(cors())

// 解析 JSON 请求体
app.use(express.json())

// 使用路由
app.use('/api', cloudinaryDeleteRouter)

// 测试路由
app.get('/test', (req, res) => {
  res.json({ message: 'Cloudinary 删除服务正在运行' })
})

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`)
})
