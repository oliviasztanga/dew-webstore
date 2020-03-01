import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {Home, Navbar, ItemsList} from './components/index'
import {getAllItems} from './store/reducers/itemsReducer'

class Routes extends Component {
  componentDidMount() {
    this.props.getAllItems()
  }

  render() {
    console.log(this.props)
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:category" component={ItemsList} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  state
})

const mapDispatchToProps = dispatch => ({
  getAllItems: () => dispatch(getAllItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
