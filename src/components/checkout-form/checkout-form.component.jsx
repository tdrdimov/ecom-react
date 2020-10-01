import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios'

import CardField from '../payment-card/payment-card.component'
import Field from '../payment-form-elements/payment-field.component'
import SubmitButton from '../payment-form-elements/payment-button.component'
import ErrorMessage from '../payment-form-elements/payment-error.component'

import './checkout-form.styles.scss';

const CheckoutForm = ({ cartItems, total }) => {
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
      axios.post('http://localhost:5000/crwn-react-6b805/us-central1/createPaymentIntent', {items: cartItems, totalPrice: total})
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
      console.log(payload);
      // setPaymentMethod(payload.paymentMethod);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: '',
      phone: '',
      name: '',
    });
  };

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thanks for trying Stripe Elements. No money was charged, but we
        generated a PaymentMethod: {paymentMethod.id}
      </div>
      <div onClick={reset}>Reset form!</div>
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
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Place your order
      </SubmitButton>
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutForm)