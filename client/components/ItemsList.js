import React from 'react'
import {connect} from 'react-redux'

import {NotFound, ItemCard} from './index'

const ItemsList = props => {
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
        {itemsToList.length ? (
          itemsToList.map(item => <ItemCard key={item.id} item={item} />)
        ) : (
          <p>Seems we're out of stock!</p>
        )}
      </div>
    )
  } else return <NotFound />
}

const mapStateToProps = state => ({
  allItems: state.itemsReducer.allItems
})

export default connect(mapStateToProps)(ItemsList)
