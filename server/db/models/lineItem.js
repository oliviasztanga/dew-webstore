const Sequelize = require('sequelize')
const db = require('../db')
const Option = require('./option')

const LineItem = db.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  subtotal: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0.0
    }
  }
})

LineItem.prototype.calculateSubtotal = async function() {
  const {price} = await Option.findByPk(this.optionId)
  this.subtotal = this.quantity * price
}

LineItem.beforeSave(instance => instance.calculateSubtotal())

module.exports = LineItem
