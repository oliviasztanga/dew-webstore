import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import {logout} from '../store/reducers/userReducer'

const Navbar = props => {
  const {isLoggedIn} = props
  return (
    <nav className="navbar navbar-expand-md fixed-top d-flex justify-content-between navbar-light bg-light">
      <div className="">
        <Link to="/" className="navbar-brand">
          dew
        </Link>
      </div>
      <div className="">
        <ul className="navbar-nav">
          <li className="nav-link mx-3">
            <Link to="/all">All</Link>
          </li>
          <li className="nav-link mx-3">
            <Link to="/eyes">Eyes</Link>
          </li>
          <li className="nav-link mx-3">
            <Link to="/lips">Lips</Link>
          </li>
          <li className="nav-link mx-3">
            <Link to="/face">Face</Link>
          </li>
          <li className="nav-link mx-3">
            <Link to="/lashes%20&%20brows">Lashes & Brows</Link>
          </li>
        </ul>
      </div>
      <div className="">
        <ul className="navbar-nav">
          <li className="nav-item dropdown dropdown-menu-left">
            <a
              className="nav-link dropdown-toggle text-secondary"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
            >
              <svg
                className="bi bi-person text-secondary"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {isLoggedIn ? (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Link
                  to=""
                  className="dropdown-item"
                  onClick={() => props.logout()}
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="dropdown-menu">
                <Link to="/login" className="dropdown-item">
                  Login
                </Link>
                <Link to="/signup" className="dropdown-item">
                  Signup
                </Link>
              </div>
            )}
          </li>
          <li className="nav-item nav-link">
            <Link to="/cart">
              <svg
                className="bi bi-bag text-secondary"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14 5H2v9a1 1 0 001 1h10a1 1 0 001-1V5zM1 4v10a2 2 0 002 2h10a2 2 0 002-2V4H1z"
                  clipRule="evenodd"
                />
                <path d="M8 1.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
