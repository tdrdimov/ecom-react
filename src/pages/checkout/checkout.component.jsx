import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import Payment from '../payment/payment.component'

import './checkout.styles.scss'

const CheckoutPage = ({ cartItems, total }) => (
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
      <div className="total">
        <span>Total price: ${total}.00</span>
      </div>
    </div>

    
  </div>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage)