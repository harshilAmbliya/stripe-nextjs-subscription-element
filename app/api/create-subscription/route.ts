

import stripe from "@/utils/stripe";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { data } = await req.json();
  console.log(data);
  const { priceId, customerId } = data;
  
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId,
      },
    ],
    payment_behavior: "default_incomplete",
    payment_settings: {
      save_default_payment_method: "on_subscription",
    },
    expand: ["latest_invoice.payment_intent"],
  });

  return NextResponse.json(
    { subscription, message: "custom created successfully.." },
    { status: 200, statusText: "Success" }
  );
};
