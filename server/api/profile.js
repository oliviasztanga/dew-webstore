const router = require('express').Router()
const {User, Product, Option, Order, LineItem} = require('../db/models')

router.post('/edit', async (req, res, next) => {
  try {
    const {firstName, lastName, email} = req.body
    const user = await User.findByPk(req.user.id)
    const updatedUser = await user.update({firstName, lastName, email})
    res.send(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.get('/orders', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      where: {
        status: 'completed',
        userId: req.user.id
      },
      include: [
        {
          model: LineItem,
          include: [
            {
              model: Option,
              include: [
                {
                  model: Product
                }
              ]
            }
          ]
        }
      ]
    })
    res.send(allOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/orders/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: LineItem,
          include: [
            {
              model: Option,
              include: [
                {
                  model: Product
                }
              ]
            }
          ]
        }
      ]
    })
    res.send(singleOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
