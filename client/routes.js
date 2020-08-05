import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {toast} from 'react-toastify'
import {
  Home,
  Login,
  Signup,
  Profile,
  Navbar,
  Footer,
  AllProducts,
  SingleProduct,
  Cart,
  Checkout
} from './components/index'
import ScrollToTop from './scrollToTop'
import {me} from './store/reducers/userReducer'
import {getCart} from './store/reducers/cartReducer'
import {getAllProducts} from './store/reducers/productsReducer'

toast.configure({
  autoClose: 2000,
  position: toast.POSITION.BOTTOM_RIGHT
})

const Routes = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(me())
    dispatch(getCart())
    dispatch(getAllProducts())
  }, [])

  return (
    <Router>
      <ScrollToTop>
        <Navbar />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/:category" component={AllProducts} />
            <Route exact path="/item/:id" component={SingleProduct} />
          </Switch>
          <Footer />
        </div>
      </ScrollToTop>
    </Router>
  )
}

export default Routes
