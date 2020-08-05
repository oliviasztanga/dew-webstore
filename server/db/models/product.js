const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['eyes', 'lips', 'face', 'lashes & brows']]
    }
  }
})

module.exports = Product
