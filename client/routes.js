import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {
  Home,
  Login,
  Signup,
  Navbar,
  AllProducts,
  SingleProduct
  // Cart
} from './components/index'

import {me} from './store/reducers/userReducer'
import {getAllProducts} from './store/reducers/productsReducer'

class Routes extends Component {
  componentDidMount() {
    this.props.getLogInData()
    this.props.getAllProducts()
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          {/* <Route exact path="/cart" component={Cart} /> */}
          <Route exact path="/:category" component={AllProducts} />
          <Route exact path="/item/:id" component={SingleProduct} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  getLogInData: () => dispatch(me())
  // getAllProducts: () => dispatch(getAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
