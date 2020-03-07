import React from 'react'
import {connect} from 'react-redux'

import {ItemCard} from './index'

const Cart = props => {
  if (props.cart.length) {
    return (
      <div>
        {props.cart.map(listItem => (
          <ItemCard
            key={listItem.item.id}
            item={listItem.item}
            quantity={listItem.quantity}
          />
        ))}
        <h3>Total: {props.total}</h3>
      </div>
    )
  } else {
    return <p>There are no items in your cart.</p>
  }
}

const mapStateToProps = state => ({
  cart: state.cartReducer.cart,
  total: state.cartReducer.total
})

export default connect(mapStateToProps)(Cart)
