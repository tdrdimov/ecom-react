import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios'

import CardField from '../payment-card/payment-card.component'
import Field from '../payment-form-elements/payment-field.component'
import SubmitButton from '../payment-form-elements/payment-button.component'
import ErrorMessage from '../payment-form-elements/payment-error.component'

import { removeItem } from '../../redux/cart/cart.actions'

import { firestore } from '../../firebase/firebase.utils'

import './checkout-form.styles.scss';

const CheckoutForm = ({ user, cartItems, total, removeItem }) => {
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    phone: '',
    name: '',
  });

  useEffect(() => {
      axios.post('https://us-central1-crwn-react-6b805.cloudfunctions.net/createPaymentIntent', {items: cartItems, totalPrice: total})
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

  }, [cartItems, total]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      }
    });

    setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      const userRef = firestore.collection(`users`).doc(user.id).collection('payments');
      setPaymentMethod(payload.paymentIntent.payment_method);
      userRef.add(payload.paymentIntent)
      cartItems.map(cartItem => removeItem(cartItem))
    }
  };

  return paymentMethod ? (
    <div className="result">
      <div role="alert">
        Payment successful
      </div>
      <div className="result-message">
        <h1>Thank you for your purchase, your products will be shipped shortly!</h1>
      </div>
      <Link className="custom-button" to="/">Continue Shopping</Link>
    </div>
  ) : (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
      <Field
          label="Email"
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({...billingDetails, email: e.target.value});
          }}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({...billingDetails, name: e.target.value});
          }}
        />
        
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(941) 555-0123"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({...billingDetails, phone: e.target.value});
          }}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      <div className="total">
        <span>Total price: ${Number(total).toFixed(2)}</span>
      </div>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Place your order
      </SubmitButton>
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  cartItems: selectCartItems,
  total: selectCartTotal
})

const mapDispatchToProps = dispatch => ({
  removeItem: item => dispatch(removeItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)