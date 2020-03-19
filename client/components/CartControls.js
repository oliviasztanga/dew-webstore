import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addItem} from '../store/reducers/cartReducer'

class CartControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addItem(this.props.itemId, this.state.quantity)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              min="1"
              max="20"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Add to Cart" />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: (itemId, quantity) => dispatch(addItem(itemId, quantity))
})

export default connect(null, mapDispatchToProps)(CartControls)
