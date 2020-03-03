import axios from 'axios'

// ACTIONS

// const GOT_CART = 'GOT_CART'

// const gotCart = cart => ({
//   type: GOT_CART,
//   cart
// })

// export const getCart = () => async dispatch => {
//   const {data} = await axios.get('https://dew-backend.herokuapp.com/api/cart')
//   dispatch(gotCart(data))
// }

const ADD_ITEM = 'ADD_ITEM'

const addedItem = item => ({
  type: ADD_ITEM,
  item
})

export const addItem = () => async dispatch => {
  const {data} = await axios.post('https://dew-backend.herokuapp.com/api/cart')
  dispatch(addedItem(data))
}

const UPDATE_TOTAL = 'UPDATE_TOTAL'

const updateTotal = () => ({
  type: UPDATE_TOTAL
})

// REDUCER

const initialState = {
  cart: [],
  total: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    // case GOT_CART:
    //   return {...state, cart: action.cart}
    case ADD_ITEM:
      return {...state, cart: [...action.cart]}
    default:
      return state
  }
}
