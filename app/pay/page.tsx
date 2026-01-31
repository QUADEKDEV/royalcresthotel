"use client";
import React from 'react'
export default function Pay() {
  const payWithPaystack = () => {
    const handler = (window as any).PaystackPop.setup({
      key: "pk_test_xxxxx",
      email: "customer@email.com",
      amount: 500000,
      currency: "NGN",
      callback: function (response: any) {
        alert("Payment successful: " + response.reference);
      },
    });

    handler.openIframe();
  };

  return <button onClick={payWithPaystack}>Pay Now</button>;
}

