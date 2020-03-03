import React, {Component} from 'react'
import {connect} from 'react-redux'

class AddToCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stock: 0
    }
  }

  componentDidMount() {}

  handleChange(event) {}

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return <div />
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(null, mapDispatchToProps)(AddToCart)
