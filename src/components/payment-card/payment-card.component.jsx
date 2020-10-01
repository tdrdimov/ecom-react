import React from 'react'

import { CardElement } from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#555',
      color: '#555',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '18px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#777',
      },
      '::placeholder': {
        color: '#ddd',
      },
    },
    invalid: {
      iconColor: '#555',
      color: '#555',
    },
  },
};

const CardField = ({handleChange}) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={handleChange} />
  </div>
);

export default CardField