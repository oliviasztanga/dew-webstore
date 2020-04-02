/* eslint-disable complexity */
import axios from 'axios'

const url = 'http://localhost:3000'

// INITIAL STATE
const initialState = {
  cart: {},
  total: 0,
  confirmationNumber: ''
}

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const UPDATE_TOTAL = 'UPDATE_TOTAL'
const ADDED_LINEITEM = 'ADDED_LINEITEM'
const EDITED_LINEITEM = 'EDITED_LINEITEM'
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

const addedLineItem = lineItem => ({
  type: ADDED_LINEITEM,
  lineItem
})

const editedLineItem = lineItem => ({
  type: EDITED_LINEITEM,
  lineItem
})

const removedLineItem = lineItemId => ({
  type: REMOVED_LINEITEM,
  lineItemId
})

const checkedOut = (confirmationNumber, cart) => ({
  type: CHECKED_OUT,
  confirmationNumber,
  cart
})

export const removeConfirmationNumber = () => ({
  type: REMOVE_CONFIRMATION_NUMBER
})

// THUNKS

export const getCart = () => async dispatch => {
  const {data} = await axios.get(`${url}/api/cart`)
  dispatch(gotCart(data))
  dispatch(updateTotal())
}

export const addLineItem = (orderId, optionId, quantity) => async dispatch => {
  quantity = Number(quantity)
  const {data} = await axios.post(`${url}/api/cart`, {orderId, optionId, quantity})
  console.log('here', data)
  dispatch(addedLineItem(data))
  dispatch(updateTotal())
}

export const editLineItem = (orderId, optionId, quantity) => async dispatch => {
  quantity = Number(quantity)
  const {data} = await axios.put(`${url}/api/cart`, {orderId, optionId, quantity})
  if (data.deleted) dispatch(removedLineItem(data))
  else dispatch(editedLineItem(data))
  dispatch(updateTotal())
}

export const removeLineItem = (lineItemId) => async dispatch => {
  const {status} = await axios.delete(`${url}/api/cart/${lineItemId}`)
  if (status === 204) {
    dispatch(removedLineItem(lineItemId))
    dispatch(updateTotal())
  }
}

// GOING TO NEED TO ADD FORM DATA HERE
export const checkout = (orderId, recipientFirstName, recipientLastName, recipientAddress) => async dispatch => {
  const {data} = await axios.post(`${url}/api/cart/checkout`, {
    orderId,
    recipientFirstName,
    recipientLastName,
    recipientAddress
  })
  const [confirmationNumber, cart] = data
  dispatch(checkedOut(confirmationNumber, cart))
}

// REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_CART:
      return {...state, cart: action.cart}

    case UPDATE_TOTAL: {
      let lineItems = [...state.cart.lineitems]
      const total = lineItems.reduce((sum, lineItem) => sum + Number(lineItem.subtotal), 0).toFixed(2)
      return {...state, total}
    }

    case ADDED_LINEITEM: {
      let lineItems = [...state.cart.lineitems]
      const searchIdx = lineItems.findIndex(el => el.id === action.lineItem.id)
      if (searchIdx === -1) lineItems.push(action.lineItem)
      else lineItems[searchIdx] = action.lineItem
      return {...state, cart: {...state.cart, lineitems: lineItems}}
    }

    case EDITED_LINEITEM: {
      let lineItems = [...state.cart.lineitems]
      const searchIdx = lineItems.findIndex(el => el.id === action.lineItem.id)
      lineItems[searchIdx] = action.lineItem
      return {...state, cart: {...state.cart, lineitems: lineItems}}
    }

    case REMOVED_LINEITEM: {
      let lineItems = state.cart.lineitems.filter(el => el.id !== action.lineItemId)
      return {...state, cart: {...state.cart, lineitems: lineItems}}
    }

    case CHECKED_OUT:
      return {
        ...initialState,
        confirmationNumber: action.confirmationNumber,
        cart: action.cart
      }

    case REMOVE_CONFIRMATION_NUMBER:
      return initialState

    default:
      return state
  }
}
