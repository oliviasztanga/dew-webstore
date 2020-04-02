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
            <div className="row">
                <div className="col-12 col-md-4">
                    <Link to={`/item/${lineitem.option.id}`}>
                        <div>
                            <img className="img-fluid" src={`http://localhost:3000/images/${lineitem.option.photos[0]}`} />
                        </div>
                    </Link>
                </div>
                <div className="col d-flex flex-column justify-content-center ml-4">
                    <div className="mb-2">
                        <h4>{lineitem.option.color}</h4>
                        <h5>{lineitem.option.product.name}</h5>
                        <p>{lineitem.option.price}</p>
                    </div>
                    <div>
                        <form className="form-inline" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="d-flex flex-row justify-content-start align-items-center flex-wrap">
                                    <input className="form-control mr-2 mb-2" type="number" name="quantity" min="0" value={this.state.quantity} onChange={this.handleChange}/>
                                    <button className="btn btn-light mr-2 mb-2 flex-shrink-0"  type="submit">Save Quantity</button>
                                    <button className="btn btn-light mb-2 flex-shrink-0" type="button" onClick={() => removeLineItem(lineitem.id)}>Remove</button>
                                </div>
                            </div>
                        </form>
                    </div>
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