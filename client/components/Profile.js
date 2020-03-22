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

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit (event) {
        event.preventDefault()
        const {editUser} = this.props
        editUser(this.state)
    }

    render() {
        const {orders} = this.props
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="firstName">
                        <small>First Name</small>
                    </label>
                    <input name="firstName" type="text" value={this.state.firstName || ''} onChange={this.handleChange} />

                    <label htmlFor="lastName">
                        <small>Last Name</small>
                    </label>
                    <input name="lastName" type="text" value={this.state.lastName || ''} onChange={this.handleChange} />

                    <label htmlFor="email">
                        <small>Email</small>
                    </label>
                    <input name="email" type="text" value={this.state.email || ''} onChange={this.handleChange} />

                    <button type="submit">Save</button>
                </form>
                <div>
                    <h3>Past Orders:</h3>
                    <div>
                        {orders.map(order => <PastOrder key={order.id} order={order} />)}
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
    editUser: (formData) => dispatch(editUser(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserData)

const PastOrder = props => {
    const {order} = props
    const date = moment(order.dateCompleted).format('MMMM Do YYYY, h:mm a')
    const total = order.lineitems.reduce((sum, lineitem) => sum + Number(lineitem.subtotal), 0).toFixed(2)
    return (
        <div>
            <p>Date: {date}</p>
            <p>Total: ${total}</p>

        </div>
    )
}