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

    componentWillUnmount () {
        const {confirmationNumber, removeConfirmationNumber} = this.props
        if (confirmationNumber) removeConfirmationNumber()
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit (event) {
        event.preventDefault()
        const {cartId} = this.props
        const {recipientFirstName, recipientLastName, recipientAddress} = this.state
        this.props.checkout(cartId, recipientFirstName, recipientLastName, recipientAddress)
    }

    render () {
        const {confirmationNumber} = this.props
        if (confirmationNumber) {
            return (
                <div>
                    <h2>Thanks for shopping!</h2>
                    <h3>Your confirmation number is: {confirmationNumber}</h3>
                    <Link to="/"><button type="button">Continue Shopping</button></Link>
                </div>
            )
        } else {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="recipientFirstName">
                            <small>Recipient First Name</small>
                        </label>
                        <input name="recipientFirstName" type="text" value={this.state.recipientFirstName} onChange={this.handleChange} />
                        
                        <label htmlFor="recipientLastName">
                            <small>Recipient Last Name</small>
                        </label>
                        <input name="recipientLastName" type="text" value={this.state.recipientLastName} onChange={this.handleChange} />
                        
                        <label htmlFor="recipientAddress">
                            <small>Recipient Address</small>
                        </label>
                        <input name="recipientAddress" type="text" value={this.state.recipientAddress} onChange={this.handleChange} />
                        <button type="submit">Complete Order</button>
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
    checkout: (cartId, recFirstName, recLastName, recAddress) => dispatch(checkout(cartId, recFirstName, recLastName, recAddress)),
    removeConfirmationNumber: () => dispatch(removeConfirmationNumber())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartCard)