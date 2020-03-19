import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {
  Home,
  Login,
  Signup,
  Navbar,
  ItemsList,
  SingleItem,
  Cart
} from './components/index'
import {me} from './store/reducers/userReducer'
import {getCart} from './store/reducers/cartReducer'
import {getAllItems} from './store/reducers/itemsReducer'

class Routes extends Component {
  componentDidMount() {
    this.props.getLogInData()
    this.props.getCart()
    this.props.getAllItems()
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/:category" component={ItemsList} />
          <Route exact path="/item/:id" component={SingleItem} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  getLogInData: () => dispatch(me()),
  getCart: () => dispatch(getCart()),
  getAllItems: () => dispatch(getAllItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
