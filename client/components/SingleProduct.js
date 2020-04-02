import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {getSingleProduct, removeSelectedProduct} from '../store/reducers/productsReducer'
import {addLineItem} from '../store/reducers/cartReducer'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.removeSelectedProduct()
  }

  handleChange (event) {
    if (event.target.value > this.props.product.stock) event.target.value = this.props.product.stock
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.addLineItem(this.props.cartId, this.props.product.id, this.state.quantity)
    toast('Item added!   💧')
  }

  render() {
    if (this.props.product.id) {
      const {product} = this.props
      return (
        <div className="container min-vh-100">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent">
              <li className="breadcrumb-item"><Link to="/">home</Link></li>
              <li className="breadcrumb-item"><Link to="/all">all products</Link></li>
              <li className="breadcrumb-item"><Link to={`/${product.product.category}`}>{product.product.category}</Link></li>
            </ol>
          </nav>
          <div className="row py-5">
              <div className="col-12 col-md-6">
                <img
                  className="img-fluid"
                  src={`http://localhost:3000/images/${product.photos[0]}`
                }
                />
              </div>
              <div className="col d-flex flex-column justify-content-center ml-4">
                <div className="mb-5">
                  <h3>{product.color}</h3>
                  <h4>{product.product.name}</h4>
                  <p>{product.price}</p>
                  <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="d-flex flex-row justify-content-start align-items-center flex-wrap">
                      <input className="form-control mr-2 mb-2" type="number" name="quantity" min="1" value={this.state.quantity} onChange={this.handleChange}/>
                      <button className="btn btn-light mb-2 flex-shrink-0" type="submit">Add to Cart</button>
                    </div>
                  </form>
                </div>  
                <div>
                  <h4>Details:</h4>
                  <p>{product.product.description}</p>
                </div>
              </div>
          </div>
        </div>
      )
    } else return null
  }
}

const mapStateToProps = state => ({
  product: state.productsReducer.selectedProduct,
  cartId: state.cartReducer.cart.id
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProduct(id)),
  removeSelectedProduct: () => dispatch(removeSelectedProduct()),
  addLineItem: (orderId, optionId, quantity) => dispatch(addLineItem(orderId, optionId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
