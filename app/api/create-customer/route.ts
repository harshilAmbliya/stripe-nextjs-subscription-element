import stripe from "@/utils/stripe"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { data } = await req.json()
  const { name, email, planId } = data

  const customers = await stripe.customers.create({
    name,
    email,
    payment_method: "pm_card_visa",
    
  })

  return NextResponse.json(
    { customers, message: "custom created successfully.." },
    { status: 200, statusText: "Success" }
  )
}
