import axios from 'axios'

// INITIAL STATE
const initialState = {
  allOrders: [],
  selectedOrder: {}
}

// ACTION TYPES
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const GOT_SELECTED_ORDER = 'GOT_SELECTED_ORDER'
const REMOVE_SELECTED_ORDER = 'REMOVE_SELECTED_ORDER'

// ACTION CREATORS
const gotAllOrders = orders => ({
  type: GOT_ALL_ORDERS,
  orders
})

const gotSingleOrder = order => ({
  type: GOT_SELECTED_ORDER,
  order
})

export const removeSelectedOrder = () => ({
  type: REMOVE_SELECTED_ORDER
})

// THUNKS

export const getAllOrders = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/profile/orders`)
    dispatch(gotAllOrders(data))
  } catch (error) {
    console.error(error)
  }
}

export const getSingleOrder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/profile/orders/${id}`)
    dispatch(gotSingleOrder(data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_ORDERS:
      return {...state, allOrders: action.orders}
    case GOT_SELECTED_ORDER:
      return {...state, selectedOrder: action.order}
    case REMOVE_SELECTED_ORDER:
      return {...state, selectedOrder: {}}
    default:
      return state
  }
}
