import React, {Component} from 'react'
import {connect} from 'react-redux'

import moment from 'moment'

import {getAllOrders} from '../store/reducers/ordersReducer'
import {editUser} from '../store/reducers/userReducer'

class UserData extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const {user, getAllOrders} = this.props
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
    getAllOrders()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const {editUser} = this.props
    editUser(this.state)
  }

  render() {
    const {orders} = this.props
    return (
      <div className="container max-width-100 min-vh-100 my-5">
        <div className="row">
          <div className="col-12 col-md-6 px-5 mx-5">
            <h3 className="mb-3">Shopper Information:</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <input
                  className="form-control"
                  name="firstName"
                  type="text"
                  value={this.state.firstName || ''}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">
                  <small>Last Name</small>
                </label>
                <input
                  className="form-control"
                  name="lastName"
                  type="text"
                  value={this.state.lastName || ''}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input
                  className="form-control"
                  name="email"
                  type="text"
                  value={this.state.email || ''}
                  onChange={this.handleChange}
                />
              </div>
              <button className="btn btn-light" type="submit">
                Save
              </button>
            </form>
          </div>
          <div className="col">
            <h3 className="mb-3">Past Orders:</h3>
            <div>
              <ul className="list-group">
                {orders.map(order => {
                  return (
                    <li className="list-group-item" key={order.id}>
                      <PastOrder order={order} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orders: state.ordersReducer.allOrders
})

const mapDispatchToProps = dispatch => ({
  getAllOrders: () => dispatch(getAllOrders()),
  editUser: formData => dispatch(editUser(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserData)

const PastOrder = props => {
  const {order} = props
  const date = moment(order.dateCompleted).format('MMMM Do YYYY, h:mm a')
  const total = order.lineitems
    .reduce((sum, lineitem) => sum + Number(lineitem.subtotal), 0)
    .toFixed(2)
  return (
    <div>
      <p className="font-weight-bold">{date}</p>
      <p>Total: ${total}</p>
    </div>
  )
}
