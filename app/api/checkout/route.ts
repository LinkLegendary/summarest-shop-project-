
// app/api/checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  const { plan, userId, email } = await req.json();

  if (!userId || !email) {
    return NextResponse.json({ error: "Missing userId or email" }, { status: 400 });
  }

  const priceId =
    plan === "yearly"
      ? process.env.STRIPE_PRICE_YEARLY!
      : process.env.STRIPE_PRICE_MONTHLY!;

  // 1️⃣ Create Stripe customer
  const customer = await stripe.customers.create({
    email,
  });

  // 2️⃣ Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customer.id,
    locale: "en", // 👈 ADD THIS
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
    metadata: {
      userId, // ✅ pass Firebase UID so webhook can update
    },
  });

  return NextResponse.json({ url: session.url });
}














// import Stripe from "stripe";
// import { NextResponse } from "next/server";




// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2022-11-15",
// });

// export async function POST(req: Request) {
  
//   const { plan, userId, email } = await req.json();

//   const priceId =
//     plan === "yearly"
//       ? process.env.STRIPE_PRICE_YEARLY!
//       : process.env.STRIPE_PRICE_MONTHLY!;

//   // 1. Create customer first
//   const customer = await stripe.customers.create({
//     email,
//   });

//   // 2. Create checkout session
//   const session = await stripe.checkout.sessions.create({
//     mode: "subscription",
//     customer: customer.id,
//     line_items: [{ price: priceId, quantity: 1 }],
//     success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
//     cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
//     metadata: {
//        userId,

//      },
     
//   });

//   return NextResponse.json({ url: session.url });
// }














