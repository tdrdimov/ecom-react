import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import Payment from '../payment/payment.component'

import './checkout.styles.scss'

const CheckoutPage = ({ cartItems }) => (
	<Container fluid className='checkout-page'>
    <h2 className='title'>Checkout</h2>
		<Row className='checkout-items'>
			<Col md={7}>
      <Row>
      {cartItems.map((cartItem) => (
				<Col lg={6}>
					<CheckoutItem
						key={cartItem.id + Math.random(100)}
						cartItem={cartItem}
					/>
				</Col>
			))}
      </Row>
      </Col>
			<Col md={5} className='checkout-payment'>
				<Payment />
			</Col>
		</Row>
	</Container>
)

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
})

export default connect(mapStateToProps)(CheckoutPage)
