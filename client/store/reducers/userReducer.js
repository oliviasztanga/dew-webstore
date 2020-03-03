import axios from 'axios'

const defaultUser = {}

// ACTIONS

const GOT_USER = 'GOT_USER'

const gotUser = user => ({
  type: GOT_USER,
  user
})

const getUser = () => async dispatch => {
  try {
    const {data} = await axios.get('http://localhost:3000/auth/me')
    console.log(data)
    dispatch(gotUser(data || defaultUser))
  } catch (error) {
    console.error(error)
  }
}

export const login = (email, password, method) => async dispatch => {
  let user
  try {
    const {data} = await axios.post(`http://localhost:3000/auth/${method}`, {
      email,
      password
    })
    user = data
    console.log(user)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(user))
    //history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

const REMOVE_USER = 'REMOVE_USER'

const removeUser = () => ({
  type: REMOVE_USER
})

export const logout = () => async dispatch => {
  try {
    await axios.post('http://localhost:3000/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

const CREATED_USER = 'CREATED_USER'

const createdUser = newUser => ({
  type: CREATED_USER,
  newUser
})

export const createUser = newUser => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        'http://localhost:3000/auth/signup',
        newUser
      )
      console.log(data)
      dispatch(createdUser(data))
    } catch (err) {
      console.log('User was not created. See: ', err)
    }
  }
}

// REDUCER

const initialState = defaultUser

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.user
    case CREATED_USER:
      return action.newUser
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
