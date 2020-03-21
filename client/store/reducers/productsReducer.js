import axios from 'axios'

// const url = 'http://dew-backend.herokuapp.com'
const url = 'http://localhost:3000'

// INITIAL STATE
const initialState = {
  allProducts: [],
  selectedProduct: {}
}

// ACTION TYPES
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_SELECTED_PRODUCT = 'GOT_SELECTED_PRODUCT'
const REMOVE_SELECTED_PRODUCT = 'REMOVE_SELECTED_PRODUCT'

// ACTION CREATORS
const gotAllProducts = products => ({
  type: GOT_ALL_PRODUCTS,
  products
})

const gotSingleProduct = product => ({
  type: GOT_SELECTED_PRODUCT,
  product
})

export const removeSelectedProduct = () => ({
  type: REMOVE_SELECTED_PRODUCT
})

// THUNKS

export const getAllProducts = () => async dispatch => {
  try {
    const {data} = await axios.get(`${url}/api/products`)
    dispatch(gotAllProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const getSingleProduct = id => async dispatch => {
  try {
    const {data} = await axios.get(`${url}/api/products/${id}`)
    dispatch(gotSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, allProducts: action.products}
    case GOT_SELECTED_PRODUCT:
      return {...state, selectedProduct: action.product}
    case REMOVE_SELECTED_PRODUCT:
      return {...state, selectedProduct: {}}
    default:
      return state
  }
}
