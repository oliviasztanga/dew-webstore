import axios from 'axios'

// const url = 'http://dew-backend.herokuapp.com'
const url = 'http://localhost:3000'

// INITIAL STATE
const initialState = {
  cart: [],
  total: 0,
  confirmationNumber: ''
}

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const UPDATE_TOTAL = 'UPDATE_TOTAL'
const ADDED_OR_EDITED_LINEITEM = 'ADDED_OR_EDITED_LINEITEM'
const REMOVED_LINEITEM = 'REMOVED_LINEITEM'
const CHECKED_OUT = 'CHECKED_OUT'
const REMOVE_CONFIRMATION_NUMBER = 'REMOVE_CONFIRMATION_NUMBER'

// ACTION CREATORS

const gotCart = cart => ({
  type: GOT_CART,
  cart
})

export const updateTotal = () => ({
  type: UPDATE_TOTAL
})

const addedOrEditedLineItem = lineItem => ({
  type: ADDED_OR_EDITED_LINEITEM,
  lineItem
})

const removedLineItem = lineItem => ({
  type: REMOVED_LINEITEM,
  lineItem
})

const checkedOut = confirmationNumber => ({
  type: CHECKED_OUT,
  confirmationNumber
})

export const removeConfirmationNumber = () => ({
  type: REMOVE_CONFIRMATION_NUMBER
})

// THUNKS

export const getCart = () => async dispatch => {
  const {data} = await axios.get(`${url}/api/cart`)
  dispatch(gotCart(data))
}

export const addOrEditLineItem = (
  orderId,
  optionId,
  quantity
) => async dispatch => {
  const {data} = await axios.put(`${url}/api/cart`, {
    orderId,
    optionId,
    quantity
  })
  dispatch(addedOrEditedLineItem(data))
}

export const removeLineItem = (orderId, optionId) => async dispatch => {
  const {data} = await axios.delete(`${url}/api/cart`, {orderId, optionId})
  dispatch(removedLineItem(data))
}

// GOING TO NEED TO ADD FORM DATA HERE
export const checkout = orderId => async dispatch => {
  const {data} = await axios.post(`${url}/api/cart/checkout`, {orderId})
  dispatch(checkedOut(data))
}

// REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_CART:
      return {...state, cart: action.cart}

    case UPDATE_TOTAL: {
      let cart = [...state.cart]
      const total = cart.reduce((sum, lineItem) => sum + lineItem.subtotal)
      return {...state, total}
    }

    case ADDED_OR_EDITED_LINEITEM: {
      let cart = [...state.cart]
      const searchIdx = cart.findIndex(el => el.id === action.lineItem.id)
      if (searchIdx) cart[searchIdx] = action.lineItem
      else cart.push(action.lineItem)
      return {...state, cart}
    }

    case REMOVED_LINEITEM: {
      let cart = state.cart.filter(el => el.id !== action.lineItem.id)
      return {...state, cart}
    }

    case CHECKED_OUT:
      return {...initialState, confirmationNumber: action.confirmationNumber}

    case REMOVE_CONFIRMATION_NUMBER:
      return initialState

    default:
      return state
  }
}
