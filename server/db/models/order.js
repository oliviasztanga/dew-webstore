const Sequelize = require('sequelize')
const db = require('../db.js')
const LineItem = require('./lineItem')
const Option = require('./option')
const randomize = require('randomatic')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'started',
    validate: {
      isIn: [['started', 'completed']]
    }
  },
  recipientFirstName: {
    type: Sequelize.STRING
  },
  recipientLastName: {
    type: Sequelize.STRING
  },
  recipientAddress: {
    type: Sequelize.STRING
  },
  confirmationNumber: {
    type: Sequelize.STRING
  },
  dateCompleted: {
    type: Sequelize.DATE
  },
  sessionId: {
    type: Sequelize.STRING
  }
})

// DO I REALLY WANT TO DO THIS HERE? IT REQUIRES SO MUCH QUERYING...

// Order.prototype.calculateTotal = async function (isCheckout) {
//   let total = 0
//   let lineItems = await LineItem.findAll({where: {orderId: this.id}})
//   await Promise.all(lineItems.map(async lineItem => {
//     if (isCheckout) {
//       const option = await Option.findByPk(lineItem.optionId)
//       await option.decrementStock(lineItem.quantity)
//     }

//     // ********
//     // WILL IT WORK WITHOUT PARSEINT? IT SHOULD...
//     // ********
//     //
//     // total += parseInt(lineItem.subtotal)

//     total += lineItem.subtotal
//   }))
//   return total
// }

Order.prototype.checkout = async function() {
  this.status = 'completed'
  this.dateCompleted = Date.now()
  this.confirmationNumber = randomize('Aa0', 20)
  const lineItems = await LineItem.findAll({
    where: {
      orderId: this.id
    }
  })
  await Promise.all(
    lineItems.map(async lineItem => {
      const option = await Option.findByPk(lineItem.optionId)
      await option.decrementStock(lineItem.quantity)
    })
  )
  await this.save()
}

module.exports = Order
