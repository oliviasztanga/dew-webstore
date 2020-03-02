import axios from 'axios'

// ACTIONS

const GOT_ALL_ITEMS = 'GOT_ALL_ITEMS'

const gotAllItems = items => ({
  type: GOT_ALL_ITEMS,
  items
})

export const getAllItems = () => async dispatch => {
  const {data} = await axios.get('http://localhost:3000/api/items')
  dispatch(gotAllItems(data))
}

const GOT_SELECTED_ITEM = 'GOT_SELECTED_ITEM'

const gotSingleItem = item => ({
  type: GOT_SELECTED_ITEM,
  item
})

export const getSingleItem = id => async dispatch => {
  const {data} = await axios.get(`http://localhost:3000/api/items/${id}`)
  dispatch(gotSingleItem(data))
}

const REMOVE_SELECTED_ITEM = 'REMOVE_SELECTED_ITEM'

export const removeSelectedItem = () => ({
  type: REMOVE_SELECTED_ITEM
})

// REDUCER

const initialState = {
  allItems: [],
  selectedItem: {}
}

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
