import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {CartCard} from './index'

const Cart = () => {
  const isLoggedIn = useSelector(state => !!state.user.id)
  const {cart, total} = useSelector(state => state.cartReducer)

  return (
    <div className="container min-vh-100 my-4">
      {isLoggedIn ? null : <AuthNudge />}
      <div>
        {cart.lineitems
          ? cart.lineitems.map(lineitem => (
              <CartCard key={lineitem.id} lineitem={lineitem} />
            ))
          : null}
      </div>
      <div className="text-center mt-5">
        <h5>Total: ${total}</h5>
        <Link to="/checkout">
          <button className="btn btn-light m-3" type="button">
            Checkout Order
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Cart

const AuthNudge = () => {
  return (
    <div className="w-75 mx-auto px-5 py-3 rounded text-center brand-pink">
      <h5 className="mb-4">Hey, you! You should log in or sign up!</h5>
      <Link to="/login">
        <button
          className="btn btn-outline-dark btn-sm mx-2"
          type="button"
          name="link"
        >
          Log In
        </button>
      </Link>
      <Link to="/signup">
        <button
          className="btn btn-outline-dark btn-sm mx-2"
          type="button"
          name="link"
        >
          Sign Up
        </button>
      </Link>
    </div>
  )
}
