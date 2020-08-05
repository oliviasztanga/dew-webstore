import React from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {NotFound, ProductCard} from './index'

const AllProducts = () => {
  const {category} = useParams()
  const isFound = ['all', 'eyes', 'lips', 'face', 'lashes & brows'].includes(
    category
  )
  const allProducts = useSelector(state => state.productsReducer.allProducts)
  const productsToList =
    category === 'all'
      ? allProducts
      : allProducts.filter(product => product.product.category === category)

  return (
    <>
      {isFound ? (
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
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default AllProducts
