import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getSingleItem, removeSelectedItem} from '../store/reducers/itemsReducer'

class SingleItem extends Component {
  componentDidMount() {
    this.props.getSingleItem(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.removeSelectedItem()
  }

  render() {
    if (this.props.item.id) {
      return (
        <div>
          <img
            src={`https://dew-backend.herokuapp.com/${
              this.props.item.photos[0]
            }`}
          />
          <h3>{this.props.item.color}</h3>
          <h4>{this.props.item.item.name}</h4>
          <p>{this.props.item.price}</p>
        </div>
      )
    } else return null
  }
}

const mapStateToProps = state => ({
  item: state.itemsReducer.selectedItem
})

const mapDispatchToProps = dispatch => ({
  getSingleItem: id => dispatch(getSingleItem(id)),
  removeSelectedItem: () => dispatch(removeSelectedItem())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
