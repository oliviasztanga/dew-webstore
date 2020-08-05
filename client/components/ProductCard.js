import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  return (
    <div className="product-card card border-0 rounded-0 flex-shrink-0 mx-auto text-center">
      <Link to={`/item/${props.product.id}`}>
        <img
          className="card-img-top p-3"
          src={`http://localhost:3000/images/${props.product.photos[0]}`}
        />
        <div>
          <p className="my-0 font-weight-bold">{props.product.product.name}</p>
          <p className="my-0">{props.product.color}</p>
          <p className="my-0">${props.product.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
