import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

import userReducer from './reducers/userReducer'
import productsReducer from './reducers/productsReducer'
import cartReducer from './reducers/cartReducer'
import ordersReducer from './reducers/ordersReducer'

const reducer = combineReducers({
  user: userReducer,
  productsReducer,
  cartReducer,
  ordersReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
)

export default store
