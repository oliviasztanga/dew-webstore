import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import {editLineItem, removeLineItem} from '../store/reducers/cartReducer'

class CartCard extends Component {
    constructor() {
        super()
        this.state = {
            quantity: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.setState({
            quantity: this.props.lineitem.quantity
        })
    }

    handleChange (event) {
        if (event.target.value > this.props.lineitem.option.stock) event.target.value = this.props.lineitem.option.stock
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit (event) {
        event.preventDefault()
        this.props.editLineItem(this.props.cartId, this.props.lineitem.option.id, this.state.quantity)
    }

    render () {
        const {lineitem, removeLineItem} = this.props
        return (
            <div>
                <Link to={`/item/${lineitem.option.id}`}>
                    <div>
                        <img src={`https://dew-backend.herokuapp.com/images/${lineitem.option.photos[0]}`} />
                        <h3>{lineitem.option.color}</h3>
                        <h4>{lineitem.option.product.name}</h4>
                    </div>
                </Link>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" name="quantity" min="0" value={this.state.quantity} onChange={this.handleChange}/>
                        <button type="submit">Edit</button>
                        <button type="button" onClick={() => removeLineItem(lineitem.id)}>Remove</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cartId: state.cartReducer.cart.id
})

const mapDispatchToProps = dispatch => ({
    editLineItem: (orderId, optionId, quantity) => dispatch(editLineItem(orderId, optionId, quantity)),
    removeLineItem: (lineItemId) => dispatch(removeLineItem(lineItemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartCard)