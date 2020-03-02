import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

import itemsReducer from './reducers/itemsReducer'
import cartReducer from './reducers/cartReducer'

const reducer = combineReducers({
  itemsReducer,
  cartReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
)

export default store
