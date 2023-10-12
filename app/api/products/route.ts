import stripe from "@/utils/stripe";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, res: NextResponse) => {
  const prices = await stripe.prices.list({
    limit: 3,
  });
  return NextResponse.json(prices.data, { status: 200 });
};
