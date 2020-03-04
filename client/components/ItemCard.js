import React from 'react'
import {Link} from 'react-router-dom'

const ItemCard = props => {
  return (
    <div>
      <Link to={`/item/${props.item.id}`}>
        <img
          src={`https://dew-backend.herokuapp.com/images/${
            props.item.photos[0]
          }`}
        />
        <h3>{props.item.color}</h3>
        <h4>{props.item.item.name}</h4>
        <p>{props.item.price}</p>
      </Link>
    </div>
  )
}

export default ItemCard
