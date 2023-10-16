"use client"

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"

type Props = {}
const CheckoutForm = (props: Props) => {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState("")

  const handlePay = async () => {
    if (!stripe || !elements) {
      return
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        receipt_email: "harshilambliya15@gmail.com",
        return_url: `${window.location.origin}/completion`,
      },
    })

    setMessage(paymentIntent?.status as string);


    console.log(message,paymentIntent?.status)
  }

  return (
    <>
      <form
        onSubmit={handlePay}
        id="payment-form"
        className="flex justify-center items-center  h-screen flex-col"
      >
        <PaymentElement
          options={{ layout: "accordion" }}
          className="w-[50vw]"
        />
        <div className="py-5">
          <button
            id="submit"
            className="rounded-md border py-2 px-4 hover:border-gray-400"
            type="submit"
          >
            Pay Now
          </button>
          {message}
        </div>
      </form>
    </>
  )
}
export default CheckoutForm
