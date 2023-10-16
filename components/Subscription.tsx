"use client"

import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

interface planProps {
  active: string
  nickname: string
  unit_amount: number
  id: string
}

interface customerProps {
  email: string
  name: string
  address: string
  balance: string
  id: string
}

const SubscriptionPage: React.FC = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [plan, setPlan] = useState<planProps | null>(null)
  const [customer, setCustomer] = useState<customerProps | null>(null)
  const [planid, setPlanid] = useState("")
  const [secret, setSecret] = useState()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products")
        setPlan(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  const handleBuySubscription = async (
    event: React.MouseEvent<HTMLButtonElement>,
    planId: string
  ) => {
    event.preventDefault()

    const { data } = await axios.post("/api/create-customer", {
      data: { name: session?.user?.name, email: session?.user?.email, planId },
    })
    setCustomer(data.customers)

    setPlanid(planId)
  }

  useEffect(() => {
    if (customer) {
      const createSub = async () => {
        try {
          const { data } = await axios.post("/api/create-subscription", {
            data: {
              priceId: planid,
              customerId: customer?.id,
            },
          })

          console.log(data)
          setSecret(
            data?.subscription?.latest_invoice?.payment_intent?.client_secret
          )
          localStorage.setItem("secret",data?.subscription?.latest_invoice?.payment_intent?.client_secret)
          router.push("/payment")
        } catch (error) {
          console.error(error)
        }
      }
      createSub()
    }
  }, [customer])

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
          Choose a Plan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array.isArray(plan) &&
            plan.map((plan: planProps, index) => (
              <div
                key={index}
                className="px-10 py-16 relative bg-white w-full  border border-gray-300 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-gray-700">
                  {plan.nickname}
                </h2>
                <p className="text-gray-600 mt-2">{plan.active}</p>
                <div className="mt-6">
                  <div className="text-3xl font-semibold text-blue-500">
                    {plan.unit_amount / 100}
                  </div>

                  <button
                    className=" bg-blue-400 text-white absolute bottom-2 right-2  py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={(event) => handleBuySubscription(event, plan.id)}
                  >
                    Buy Subscription
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage
