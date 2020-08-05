const router = require('express').Router()
const {Product, Option} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Option.findAll({
      include: [{model: Product}]
    })
    res.send(allProducts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Option.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if (singleProduct) res.send(singleProduct)
    else res.status(404).send('No product found!')
  } catch (error) {
    next(error)
  }
})

module.exports = router
