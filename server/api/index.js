const router = require('express').Router()

router.use('/products', require('./products'))
router.use('/cart', require('./cart'))
router.use('/profile', require('./profile'))

module.exports = router
