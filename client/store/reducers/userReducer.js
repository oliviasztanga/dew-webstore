import axios from 'axios'

const url = 'https://dew-backend.herokuapp.com'

// ACTIONS

const defaultUser = {}

const GOT_USER = 'GOT_USER'

const gotUser = user => ({
  type: GOT_USER,
  user
})

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

export const me = () => async dispatch => {
  try {
    const {data} = await axios.get(`${url}/auth/me`)
    dispatch(gotUser(data || defaultUser))
  } catch (error) {
    console.error(error)
  }
}

const CREATED_USER = 'CREATED_USER'

const createdUser = user => ({
  type: CREATED_USER,
  user
})

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

const REMOVED_USER = 'REMOVED_USER'

const removeUser = () => ({
  type: REMOVED_USER
})

export const logout = () => async dispatch => {
  try {
    await axios.post(`${url}/auth/logout`)
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

// REDUCER

const initialState = defaultUser

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.user
    case CREATED_USER:
      return action.user
    case REMOVED_USER:
      return defaultUser
    default:
      return state
  }
}
