/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express')
const path = require('path')
const app = express()

const PORT = process.argv[2] || 3011

app.use(
  '/images',
  express.static(path.join(__dirname, '../tmp/images'), {
    setHeaders: (res, filePath) => {
      console.log(`[Images local server] Served: ${path.basename(filePath)} at ${new Date().toISOString()}`)
    },
  }),
)

app.use('/images', (req, res) => {
  console.error(
    `\x1b[31;1m[Images local server] Missing image: ${req.originalUrl} at ${new Date().toISOString()}\x1b[0m`,
  )
  res.status(404).send('Image not found')
})

app.listen(PORT, () => {
  console.log(`[Images local server] Image server running at http://localhost:${PORT}/images`)
  console.log(`[Images local server] Serving from: ${path.resolve(__dirname, '../tmp/images')}`)
})
