const Sequelize = require('sequelize')
const db = require('../db')

const Option = db.define('option', {
  color: {
    type: Sequelize.STRING,
    defaultValue: 'one color'
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['defaultItemImage.svg']
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.0
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

Option.prototype.decrementStock = async function(requested) {
  this.stock = this.stock - requested
  await this.save()
}

module.exports = Option
