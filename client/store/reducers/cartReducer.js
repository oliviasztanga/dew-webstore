import axios from 'axios'

// const url = 'http://dew-backend.herokuapp.com'
const url = 'http://localhost:3000'

// ACTIONS

const GOT_CART = 'GOT_CART'

const gotCart = cartData => ({
  type: GOT_CART,
  cartData
})

export const getCart = () => async dispatch => {
  const {data} = await axios.get(`${url}/api/cart`)
  dispatch(gotCart(data))
}

const ADDED_ITEM = 'ADD_ITEM'

const addedItem = cartData => ({
  type: ADDED_ITEM,
  cartData
})

export const addItem = (itemId, quantity) => async dispatch => {
  const {data} = await axios.post(`${url}/api/cart`, {itemId, quantity})
  dispatch(addedItem(data))
}

const EDITED_ITEM = 'EDITED_ITEM'

const editedItem = cartData => ({
  type: EDITED_ITEM,
  cartData
})

export const editItem = (itemId, quantity) => async dispatch => {
  const {data} = await axios.put(`${url}/api/cart`, {itemId, quantity})
  dispatch(editedItem(data))
}

const REMOVED_ITEM = 'REMOVED_ITEM'

const removedItem = cartData => ({
  type: REMOVED_ITEM,
  cartData
})

export const removeItem = (itemId, clearAll) => async dispatch => {
  const {data} = await axios.delete(`${url}/api/cart`, {itemId, clearAll})
  dispatch(removedItem(data))
}

const CHECKED_OUT = 'CHECKED_OUT'

const checkedOut = () => ({
  type: CHECKED_OUT
})

export const checkOut = (
  recipientFirstName,
  recipientLastName,
  recipientAddress
) => async dispatch => {
  const {data} = await axios.post(`${url}/api/cart/checkout`, {
    recipientFirstName,
    recipientLastName,
    recipientAddress
  })
  dispatch(checkedOut(data))
}

// REDUCER

const initialState = {
  cart: [],
  total: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_CART:
      return action.cartData
    case ADDED_ITEM:
      return action.cartData
    case EDITED_ITEM:
      return action.cartData
    case REMOVED_ITEM:
      return action.cartData
    case CHECKED_OUT:
      return initialState
    default:
      return state
  }
}
