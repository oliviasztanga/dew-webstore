import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login, signup} from '../store/reducers/userReducer'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  if (props.user.id) props.history.push('/')
  return (
    <div className="container max-width-100 min-vh-100 my-5">
      <form className="w-50 mx-auto" onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div>
            <div className="form-group">
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input className="form-control" name="firstName" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input className="form-control" name="lastName" type="text" />
            </div>
          </div>
        ) : null}

        <div className="form-group">
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input className="form-control" name="email" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input className="form-control"  name="password" type="password" />
        </div>
        <div className="text-center">
          <button className="btn btn-light" type="submit">{displayName}</button>
        </div>
        <div className="text-center">
          <a href="http://localhost:3000/auth/google">{displayName} with Google</a>
          <div className="m-3">
            {error && error.response && <div> {error.response.data} </div>}
          </div>
        </div>

      </form>
    </div>
  )
}

const mapStateToPropsLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    user: state.user
  }
}

const mapDispatchToPropsLogin = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(login(email, password))
    }
  }
}

const mapStateToPropsSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    user: state.user
  }
}

const mapDispatchToPropsSignup = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(signup(firstName, lastName, email, password))
    }
  }
}

export const Login = connect(mapStateToPropsLogin, mapDispatchToPropsLogin)(
  AuthForm
)
export const Signup = connect(mapStateToPropsSignup, mapDispatchToPropsSignup)(
  AuthForm
)
