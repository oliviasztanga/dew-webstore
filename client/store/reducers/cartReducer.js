import axios from 'axios'

// const url = 'http://dew-backend.herokuapp.com'
const url = 'http://localhost:3000'

// ACTIONS

const GOT_CART = 'GOT_CART'

const gotCart = storedCart => ({
  type: GOT_CART,
  storedCart
})

export const getCart = () => async dispatch => {
  const {data} = await axios.get(`${url}/api/cart`)
  dispatch(gotCart(data))
}

const ADDED_ITEM = 'ADD_ITEM'

const addedItem = storedCart => ({
  type: ADDED_ITEM,
  storedCart
})

export const addItem = (itemId, quantity) => async dispatch => {
  const {data} = await axios.post(`${url}/api/cart`, {itemId, quantity})
  dispatch(addedItem(data))
}

const EDITED_ITEM = 'EDITED_ITEM'

const editedItem = storedCart => ({
  type: EDITED_ITEM,
  storedCart
})

export const editItem = (itemId, quantity) => async dispatch => {
  const {data} = await axios.put(`${url}/api/cart`, {itemId, quantity})
  dispatch(editedItem(data))
}

const REMOVED_ITEM = 'REMOVED_ITEM'

const removedItem = storedCart => ({
  type: REMOVED_ITEM,
  storedCart
})

export const removeItem = (itemId, clearAll) => async dispatch => {
  const {data} = await axios.delete('/', {itemId, clearAll})
  dispatch(removedItem(data))
}

// REDUCER

const initialState = {
  cart: [],
  total: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_CART:
      return action.storedCart
    case ADDED_ITEM:
      return action.storedCart
    case EDITED_ITEM:
      return action.storedCart
    case REMOVED_ITEM:
      return action.storedCart
    default:
      return state
  }
}
