"use client"

import CheckoutForm from "@/components/CheckoutForm"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useState } from "react"
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
const PaymentForm = () => {
  const [secret, setSecret] = useState(localStorage.getItem("secret") as string);

  return (
    <>
      {stripePromise && secret && (
        <Elements stripe={stripePromise} options={{ clientSecret: secret ,appearance:{theme:"stripe",labels:"floating"} }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}
export default PaymentForm
