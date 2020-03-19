import axios from 'axios'
axios.defaults.withCredentials = true

// const url = 'http://dew-backend.herokuapp.com'
const url = 'http://localhost:3000'

// INITIAL STATE
const initialState = {}

// ACTIONS TYPES
const GOT_USER = 'GOT_USER'
const CREATED_USER = 'CREATED_USER'
const REMOVED_USER = 'REMOVED_USER'

// ACTION CREATORS

const gotUser = user => ({
  type: GOT_USER,
  user
})

const createdUser = user => ({
  type: CREATED_USER,
  user
})

const removedUser = () => ({
  type: REMOVED_USER
})

// THUNKS

export const me = () => async dispatch => {
  try {
    const {data} = await axios.get(`${url}/auth/me`)
    dispatch(gotUser(data || initialState))
  } catch (error) {
    console.error(error)
  }
}

export const login = (email, password) => async dispatch => {
  let user

  try {
    const {data} = await axios.post(`${url}/auth/login`, {email, password})
    user = data
  } catch (error) {
    return dispatch(gotUser({error}))
  }

  try {
    dispatch(gotUser(user))
  } catch (error) {
    console.error(error)
  }
}

export const signup = (
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  try {
    const {data} = await axios.post(`${url}/auth/signup`, {
      email,
      password,
      firstName,
      lastName
    })
    dispatch(createdUser(data))
  } catch (error) {
    return dispatch(gotUser({error}))
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post(`${url}/auth/logout`)
    dispatch(removedUser())
  } catch (err) {
    console.error(err)
  }
}

// REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.user
    case CREATED_USER:
      return action.user
    case REMOVED_USER:
      return initialState
    default:
      return state
  }
}
