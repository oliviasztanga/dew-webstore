import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {
  Home,
  Login,
  Signup,
  Navbar,
  ItemsList,
  SingleItem
} from './components/index'
import {getAllItems} from './store/reducers/itemsReducer'

class Routes extends Component {
  componentDidMount() {
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
          <Route exact path="/:category" component={ItemsList} />
          <Route exact path="/item/:id" component={SingleItem} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getAllItems: () => dispatch(getAllItems())
})

export default connect(null, mapDispatchToProps)(Routes)
