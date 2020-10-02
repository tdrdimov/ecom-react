import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import Payment from '../payment/payment.component'

import './checkout.styles.scss'

const CheckoutPage = ({ cartItems }) => (
  <div className="checkout-page">
    <div className="checkout-items">
      {
        cartItems.map(cartItem => 
          <CheckoutItem key={cartItem.id + Math.random(100)} cartItem={cartItem} />
        )
      }
    </div>

    <div className="checkout-payment">
      <Payment />
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

export default connect(mapStateToProps)(CheckoutPage)