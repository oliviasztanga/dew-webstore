const path = require('path')
const express = require('express')
const morgan = require('morgan')
const {createProxyMiddleware} = require('http-proxy-middleware')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
  '/api/**',
  createProxyMiddleware({target: 'http://localhost:3000', changeOrigin: true})
)

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

module.exports = app
