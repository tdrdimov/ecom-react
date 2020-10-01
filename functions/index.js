const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors")({origin: true});

const app = express();
const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51HXANgAAzfv9s9on6McibxQRuHgmhfbx5un40vp1j449J3gutDF7hgHhO5DzjA7qpEVosNnzc028WN3L3MMVmwSb001nwfyeJj");
app.use(express.static("."));
app.use(express.json());

exports.createPaymentIntent = functions.https.onRequest((request, response) => {
  cors(request, response, async() => {
    
    const totalPrice = Number(request.body.totalPrice).toFixed(2);
    const total = totalPrice.split('.').join("")
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd"
    });
    
    response.send({
      clientSecret: paymentIntent.client_secret
    });
  })
  
});