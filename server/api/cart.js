const router = require('express').Router()
const {Product, Option, Order, LineItem} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const cart = await getCart(req)
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {orderId, optionId, quantity} = req.body
    let [lineItem, wasCreated] = await LineItem.findOrCreate({
      where: {
        orderId,
        optionId
      }
    })
    let newQuantity = wasCreated ? quantity : (lineItem.quantity += quantity)
    lineItem.quantity = newQuantity
    await lineItem.save()
    lineItem = await LineItem.findByPk(lineItem.id, {
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
    })
    res.send(lineItem)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const {orderId, optionId, quantity} = req.body
    const lineItem = await LineItem.findOne({
      where: {
        orderId,
        optionId
      },
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
    })
    if (quantity) {
      const editedLineItem = await lineItem.update({quantity})
      res.send(lineItem)
    } else {
      const deletedLineItem = {id: lineItem.id, deleted: true}
      await lineItem.destroy()
      res.send(deletedLineItem)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    await LineItem.destroy({
      where: {
        id
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.post('/checkout', async (req, res, next) => {
  try {
    const {
      orderId,
      recipientFirstName,
      recipientLastName,
      recipientAddress
    } = req.body
    const cart = await Order.findByPk(orderId)
    await cart.update({recipientFirstName, recipientLastName, recipientAddress})
    await cart.checkout()
    const newCart = await getCart(req)
    res.send([cart.confirmationNumber, newCart])
  } catch (error) {
    next(error)
  }
})

// ISSUE: WHAT IF USER STARTS CART AS GUEST AND LOGS IN?
// CONSIDER QUERYING A CART BY SESSION, EDIT LINE ITEMS, AND DELETE EXTRA CART? ^^
const getCart = async req => {
  if (req.user) {
    let [cart] = await Order.findOrCreate({
      where: {
        status: 'started',
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
    return cart
  } else {
    let [cart] = await Order.findOrCreate({
      where: {
        status: 'started',
        sessionId: req.sessionID
      }
    })
    cart = await Order.findByPk(cart.id, {
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
    return cart
  }
}

module.exports = router
