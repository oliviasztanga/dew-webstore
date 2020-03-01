import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Home} from './components/index'

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/" component={} /> */}
        </Switch>
      </Router>
    )
  }
}
