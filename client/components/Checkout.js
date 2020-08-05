import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import {checkout, removeConfirmationNumber} from '../store/reducers/cartReducer'

class CartCard extends Component {
  constructor() {
    super()
    this.state = {
      recipientFirstName: '',
      recipientLastName: '',
      recipientAddress: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillUnmount() {
    const {confirmationNumber, removeConfirmationNumber} = this.props
    if (confirmationNumber) removeConfirmationNumber()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const {cartId} = this.props
    const {recipientFirstName, recipientLastName, recipientAddress} = this.state
    this.props.checkout(
      cartId,
      recipientFirstName,
      recipientLastName,
      recipientAddress
    )
  }

  render() {
    const {confirmationNumber} = this.props
    if (confirmationNumber) {
      return (
        <div>
          <h2>Thanks for shopping!</h2>
          <h3>Your confirmation number is: {confirmationNumber}</h3>
          <Link to="/">
            <button type="button">Continue Shopping</button>
          </Link>
        </div>
      )
    } else {
      return (
        <div className="container min-vh-100 my-4">
          <form className="w-50 mx-auto" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="recipientFirstName">
                <small>Recipient First Name</small>
              </label>
              <input
                className="form-control"
                name="recipientFirstName"
                type="text"
                value={this.state.recipientFirstName}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="recipientLastName">
                <small>Recipient Last Name</small>
              </label>
              <input
                className="form-control"
                name="recipientLastName"
                type="text"
                value={this.state.recipientLastName}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="recipientAddress">
                <small>Recipient Address</small>
              </label>
              <input
                className="form-control"
                name="recipientAddress"
                type="text"
                value={this.state.recipientAddress}
                onChange={this.handleChange}
              />
            </div>
            <div className="text-center">
              <button className="btn btn-light" type="submit">
                Complete Order
              </button>
            </div>
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cartId: state.cartReducer.cart.id,
  confirmationNumber: state.cartReducer.confirmationNumber
})

const mapDispatchToProps = dispatch => ({
  checkout: (cartId, recFirstName, recLastName, recAddress) =>
    dispatch(checkout(cartId, recFirstName, recLastName, recAddress)),
  removeConfirmationNumber: () => dispatch(removeConfirmationNumber())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartCard)
