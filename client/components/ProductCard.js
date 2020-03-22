import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  return (
    <div>
      <Link to={`/item/${props.product.id}`}>
        <img
          src={`https://dew-backend.herokuapp.com/images/${
            props.product.photos[0]
          }`}
        />
        <h3>{props.product.color}</h3>
        <h4>{props.product.product.name}</h4>
        <p>{props.product.price}</p>
      </Link>
    </div>
  )
}

export default ProductCard
