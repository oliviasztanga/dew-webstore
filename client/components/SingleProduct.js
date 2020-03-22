import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getSingleProduct, removeSelectedProduct} from '../store/reducers/productsReducer'
import {addLineItem} from '../store/reducers/cartReducer'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.removeSelectedProduct()
  }

  handleChange (event) {
    if (event.target.value > this.props.product.stock) event.target.value = this.props.product.stock
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.addLineItem(this.props.cartId, this.props.product.id, this.state.quantity)
  }

  render() {
    if (this.props.product.id) {
      const {product} = this.props
      return (
        <div>
          <img
            src={`https://dew-backend.herokuapp.com/images/${product.photos[0]}`}
          />
          <h3>{product.color}</h3>
          <h4>{product.product.name}</h4>
          <p>{product.price}</p>

          <form onSubmit={this.handleSubmit}>
            <input type="number" name="quantity" min="1" value={this.state.quantity} onChange={this.handleChange}/>
            <button type="submit">Add to Cart</button>
          </form>
        </div>
      )
    } else return null
  }
}

const mapStateToProps = state => ({
  product: state.productsReducer.selectedProduct,
  cartId: state.cartReducer.cart.id
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProduct(id)),
  removeSelectedProduct: () => dispatch(removeSelectedProduct()),
  addLineItem: (orderId, optionId, quantity) => dispatch(addLineItem(orderId, optionId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
