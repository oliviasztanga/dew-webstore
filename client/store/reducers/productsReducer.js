import axios from 'axios'

// const url = 'http://dew-backend.herokuapp.com'
const url = 'http://localhost:3000'

// INITIAL STATE
const initialState = {
  allItems: [],
  selectedItem: {}
}

// ACTION TYPES
const GOT_ALL_ITEMS = 'GOT_ALL_ITEMS'
const GOT_SELECTED_ITEM = 'GOT_SELECTED_ITEM'
const REMOVE_SELECTED_ITEM = 'REMOVE_SELECTED_ITEM'

// ACTION CREATORS
const gotAllItems = items => ({
  type: GOT_ALL_ITEMS,
  items
})

const gotSingleItem = item => ({
  type: GOT_SELECTED_ITEM,
  item
})

export const removeSelectedItem = () => ({
  type: REMOVE_SELECTED_ITEM
})

// THUNKS

export const getAllItems = () => async dispatch => {
  try {
    const {data} = await axios.get(`${url}/api/items`)
    dispatch(gotAllItems(data))
  } catch (error) {
    console.error(error)
  }
}

export const getSingleItem = id => async dispatch => {
  try {
    const {data} = await axios.get(`${url}/api/items/${id}`)
    dispatch(gotSingleItem(data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_ITEMS:
      return {...state, allItems: action.items}
    case GOT_SELECTED_ITEM:
      return {...state, selectedItem: action.item}
    case REMOVE_SELECTED_ITEM:
      return {...state, selectedItem: {}}
    default:
      return state
  }
}
