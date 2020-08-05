import React from 'react'
import {connect} from 'react-redux'
import {NotFound, ProductCard} from './index'

const AllProducts = props => {
  const category = props.match.params.category
  const isFound = ['all', 'eyes', 'lips', 'face', 'lashes & brows'].includes(
    category
  )
  if (isFound) {
    const productsToList =
      category === 'all'
        ? props.allProducts
        : props.allProducts.filter(
            product => product.product.category === category
          )
    return (
      <div className="container min-vh-100 my-4">
        <h3>{category} products</h3>
        <div className="row row-cols-lg-3">
          {productsToList.map(product => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    )
  } else return <NotFound />
}

const mapStateToProps = state => ({
  allProducts: state.productsReducer.allProducts
})

export default connect(mapStateToProps)(AllProducts)
