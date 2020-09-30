import React from 'react';

import {loadStripe} from '@stripe/stripe-js';

import {
  Elements
} from '@stripe/react-stripe-js';

import CheckoutForm from '../../components/checkout-form/checkout-form.component'

const stripePromise = loadStripe('pk_test_51HXANgAAzfv9s9onXlOy4L4dxEHJLgDmYNOH9mh7hcmb0SMMZvH0fG0jT32PikYp1dloh20ysUa31f9XKs34QrLb00PneAo7Rw');

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment