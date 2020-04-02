import React from 'react'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {ProductCard} from './index'

const Home = props => {
  const {allProducts} = props
  const featuredProducts = allProducts.filter(product => product.id === 12 || product.id === 17 || product.id === 24)
  return (
    <div>
      <div className="jumbotron bg-white">
        <img className="img-fluid" src='http://localhost:3000/images/jumbotron.jpg' />
      </div>
      <div className="jumbotron bg-light">
        <h3>Beauty inspired by nature.</h3>
        <p>Dew is a new approach to beauty. It's about fun, freedom, and simplicity.</p>
      </div>
      <div className="jumbotron bg-white text-center">
        <div className="row row-cols-xl-3">
          {featuredProducts.map(product => {
            return (
              <div key={product.id} className="col-sm-4">
                <ProductCard product={product} />
              </div>
            )
          })}
        </div>
        <Link to="/all"><button type="button" className="btn btn-light rounded-0 mt-5">Shop Now</button></Link>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  allProducts: state.productsReducer.allProducts
})

export default connect(mapStateToProps)(Home)
