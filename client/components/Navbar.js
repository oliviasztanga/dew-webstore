import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <Link to="/">dew</Link>
      <Link to="/all">All</Link>
      <Link to="/eyes">Eyes</Link>
      <Link to="/lips">Lips</Link>
      <Link to="/face">Face</Link>
      <Link to="/lashes%20&%20brows">Lashes & Brows</Link>
    </div>
  )
}

export default Navbar
