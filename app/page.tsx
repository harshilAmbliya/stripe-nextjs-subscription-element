"use client";
// import stripe from "@/utils/stripe";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
type Props = {};
const page = (props: Props) => {
  const { data: session, status } = useSession();
  const [customer, setCustomer] = useState();
  const router = useRouter();
  // console.log(session, status);
  // const stripe = useStripe();
  // const elements = useElements();
  localStorage.setItem("PriceId", "price_1NyBOqSClOS9otQehlglAGrI");
  localStorage.setItem("customerKey", "cus_Oo4omr8MWINHIb");

  //  setCustomer(localStorage.getItem("customerId",""))
  const handleCreateCustomer = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const { data } = await axios.post("/api/create-customer", {
      data: session?.user,
    });
  };

  const price = localStorage.getItem("PriceId");
  const cuid = localStorage.getItem("customerKey");
  const handleSubscription = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { data } = await axios.post("/api/create-subscription", {
      data: {
        priceId: price,
        customerId: cuid,
      },
    });

    const secretid =data.subscription.latest_invoice.payment_intent.client_secret;
      localStorage.setItem("subscriptionSceret",secretid)
      localStorage.setItem("subscription",data)
    // console.log(secretid);
    router.push("/payment")
  };

  return (
    <div className="bg-teal-700 h-screen flex ">
      {/* <div className="w-60 bg-teal-600 h-screen">Sidebar</div> */}
      <div className="flex justify-between px-10 text-xl py-8 w-full">
        <h3 className="text-gray-50">Hey,Customers</h3>
        <div className="h-16">
          <button
            className="border-2 border-white rounded-xl text-white h-full w-60 py-2"
            onClick={handleCreateCustomer}
          >
            Create customer
          </button>
        </div>
      </div>

      <div className="h-20 ">
        <button
          className="border-2 border-white rounded-xl text-white h-full w-60 py-2 "
          onClick={handleSubscription}
        >
          Create Subscription
        </button>
      </div>
    </div>
  );
};
export default page;
