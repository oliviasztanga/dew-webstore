import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

import userReducer from './reducers/userReducer'
import itemsReducer from './reducers/itemsReducer'
import cartReducer from './reducers/cartReducer'

const reducer = combineReducers({
  user: userReducer,
  itemsReducer,
  cartReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
)

export default store
