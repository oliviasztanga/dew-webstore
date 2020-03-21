import React from 'react'
import {connect} from 'react-redux'

import {NotFound, ProductCard} from './index'

const AllProducts = props => {
  const category = props.match.params.category
  const isFound = ['all', 'eyes', 'lips', 'face', 'lashes & brows'].includes(
    category
  )
  if (isFound) {
    const itemsToList =
      category === 'all'
        ? props.allItems
        : props.allItems.filter(item => item.item.category === category)
    return (
      <div>
        {itemsToList.map(item => <ProductCard key={item.id} item={item} />)}
      </div>
    )
  } else return <NotFound />
}

const mapStateToProps = state => ({
  allItems: state.itemsReducer.allItems
})

export default connect(mapStateToProps)(AllProducts)
