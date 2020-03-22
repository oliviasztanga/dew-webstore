import React from 'react'
import {connect} from 'react-redux'

import {NotFound, ProductCard} from './index'

const AllProducts = props => {
  const category = props.match.params.category
  const isFound = ['all', 'eyes', 'lips', 'face', 'lashes & brows'].includes(category)
  if (isFound) {
    const productsToList = category === 'all' ? props.allProducts : props.allProducts.filter(product => product.product.category === category)
    return (
      <div>
        {productsToList.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    )
  } else return <NotFound />
}

const mapStateToProps = state => ({
  allProducts: state.productsReducer.allProducts
})

export default connect(mapStateToProps)(AllProducts)
