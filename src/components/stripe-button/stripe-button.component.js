import React from 'react';
import StripeCheckOut from 'react-stripe-checkout';

const StripeCheckOutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const PUBLISHABLE_KEY = 'pk_test_dO5BUObQ0QqesikZyDwHkcKI00BBUTYT2f';

  const onToken = token => {
    alert('Payment Successful')
  }

  return (
    <StripeCheckOut
      label="Pay Now"
      name="MDRN Shop Inc."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={PUBLISHABLE_KEY}
      currency="CAD"
    />
  );
};

export default StripeCheckOutButton;