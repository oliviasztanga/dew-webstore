import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import {CartCard} from './index'

const Cart = props => {

    const {cart, total} = props

    return (
        <div>
            <AuthNudge />
            <div>
                { cart.lineitems ? cart.lineitems.map(lineitem => <CartCard key={lineitem.id} lineitem={lineitem} />) : null }
            </div>
            <h5>Total: {total}</h5>
            <Link to="/checkout"><button type="button">Checkout Order</button></Link>
        </div>
    )
}

const mapStateToProps = state => ({
    cartId: state.cartReducer.cart.id,
    cart: state.cartReducer.cart,
    total: state.cartReducer.total
})

export default connect(mapStateToProps)(Cart)

const AuthNudge = () => {
    return (
        <div>
            Hey, you! You should log in or sign up!
            <Link to="/login"><button type="button" name="link">Log In</button></Link>
            <Link to="/signup"><button type="button" name="link">Sign Up</button></Link>
        </div>
    )
}