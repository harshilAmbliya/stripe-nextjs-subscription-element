"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

import { useSession } from "next-auth/react";
type Props = {};
const page = (props: Props) => {
  const { data: session, status } = useSession();
  console.log(session, status);
  // const stripe = useStripe();
  // const elements = useElements();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

  return <div>page</div>;
};
export default page;
