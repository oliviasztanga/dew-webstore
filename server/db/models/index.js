const User = require('./users')
const Product = require('./product')
const Option = require('./option')
const Order = require('./order')
const LineItem = require('./lineItem')

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(LineItem)
LineItem.belongsTo(Order)

Product.hasMany(Option)
Option.belongsTo(Product)

Option.hasMany(LineItem)
LineItem.belongsTo(Option)

module.exports = {
  User,
  Product,
  Option,
  Order,
  LineItem
}
