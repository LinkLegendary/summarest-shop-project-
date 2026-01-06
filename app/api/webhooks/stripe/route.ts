// app/api/webhooks/route.ts
import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature")!;




  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  try {
    // -------------------------------
    // CHECKOUT SESSION COMPLETED
    // -------------------------------
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.subscription) {
        console.log("Checkout session completed but no subscription found.");
        return NextResponse.json({ received: true });
      }

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const customer = (await stripe.customers.retrieve(
        session.customer as string
      )) as Stripe.Customer;

      const price =
        subscription.items.data[0]?.price ?? subscription.items.data[0]?.plan ?? null;

      const userId = session.metadata?.userId;
      if (!userId) throw new Error("No userId in session metadata");

      // 1️⃣ Create subscription record
      await prisma.subscription.create({
        data: {
          userId,
          email: customer.email ?? "unknown",
          stripeSubscriptionId: subscription.id,
          stripePriceId: price?.id ?? "unknown",
          unitAmount: price?.unit_amount ?? null,
          currency: price?.currency ?? null,
          interval: price?.recurring?.interval ?? null,
          productName: price?.product ? String(price.product) : null,
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      });

      // 2️⃣ Update user's subscription to premium
      await prisma.user.update({
        where: { firebaseUid: userId },
        data: { subscription: "premium" },
      });

      console.log(`✅ User ${userId} subscription updated to premium`);
     
    }

    // -------------------------------
    // HANDLE SUBSCRIPTION EVENTS
    // -------------------------------
    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const sub = event.data.object as Stripe.Subscription;
      const price = sub.items.data[0]?.price ?? sub.items.data[0]?.plan ?? null;
      const userId = sub.metadata?.userId;
      if (!userId) return NextResponse.json({ received: true });

      // Update subscription record
      await prisma.subscription.upsert({
        where: { stripeSubscriptionId: sub.id },
        update: {
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        },
        create: {
          userId,
          email: sub.metadata?.email ?? "unknown",
          stripeSubscriptionId: sub.id,
          stripePriceId: price?.id ?? "unknown",
          unitAmount: price?.unit_amount ?? null,
          currency: price?.currency ?? null,
          interval: price?.recurring?.interval ?? null,
          productName: price?.product ? String(price.product) : null,
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        },
      });

      // Update user subscription
      if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
        await prisma.user.update({
          where: { firebaseUid: userId },
          data: { subscription: "premium" },
        });
      }

      if (event.type === "customer.subscription.deleted") {
        await prisma.user.update({
          where: { firebaseUid: userId },
          data: { subscription: "basic" },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling Stripe webhook:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}






















// // app/api/stripe-webhook/route.ts
// import Stripe from "stripe";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";
// import { prisma } from "@/app/lib/prisma";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2022-11-15",
// });

// export async function POST(req: Request) {
//   const body = await req.text();
//   const sig = (await headers()).get("stripe-signature")!;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (err) {
//     console.error("Webhook signature error:", err);
//     return new NextResponse("Webhook Error", { status: 400 });
//   }

//   try {
//     // -------------------------------
//     // CHECKOUT SESSION COMPLETED
//     // -------------------------------
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;

//       if (!session.subscription) {
//         console.log("Checkout session completed but no subscription found.");
//         return NextResponse.json({ received: true });
//       }

//       const subscription = await stripe.subscriptions.retrieve(
//         session.subscription as string
//       );

//       const customer = (await stripe.customers.retrieve(
//         session.customer as string
//       )) as Stripe.Customer;

//       const price =
//         subscription.items.data[0]?.price ?? subscription.items.data[0]?.plan ?? null;

//       const userId = session.metadata?.userId;
//      if (!userId) throw new Error("No userId in session metadata"); 


//       if (userId) {
//         await prisma.subscription.create({
//           data: {
//             userId,
//             email: customer.email ?? "unknown",
//             stripeSubscriptionId: subscription.id,
//             stripePriceId: price?.id ?? "unknown",
//             unitAmount: price?.unit_amount ?? null,
//             currency: price?.currency ?? null,
//             interval: price?.recurring?.interval ?? null,
//             productName: price?.product ? String(price.product) : null,
//             status: subscription.status,
//             currentPeriodEnd: new Date(subscription.current_period_end * 1000),
//           },
//         });

//         // 2️⃣ Update user's subscription to premium in user table
//         await prisma.user.update({
//           where: { firebaseUid: userId  },
//           data: { subscription: "premium" },
//         });

//         console.log(`User ${userId} subscription updated to premium`);
//       }
//     }

//     // -------------------------------
//     // SUBSCRIPTION CREATED / UPDATED / DELETED
//     // -------------------------------
//     if (
//       event.type === "customer.subscription.created" ||
//       event.type === "customer.subscription.updated" ||
//       event.type === "customer.subscription.deleted"
//     ) {
//       const sub = event.data.object as Stripe.Subscription;
//       const price = sub.items.data[0]?.price ?? sub.items.data[0]?.plan ?? null;
//       const userId = sub.metadata?.userId;

//       // Update subscription record table
//       if (userId) {
//         await prisma.subscription.upsert({
//           where: { stripeSubscriptionId: sub.id },
//           update: {
//             status: sub.status,
//             currentPeriodEnd: new Date(sub.current_period_end * 1000),
//           },
//           create: {
//             userId,
//             email: sub.metadata?.email ?? "unknown",
//             stripeSubscriptionId: sub.id,
//             stripePriceId: price?.id ?? "unknown",
//             unitAmount: price?.unit_amount ?? null,
//             currency: price?.currency ?? null,
//             interval: price?.recurring?.interval ?? null,
//             productName: price?.product ? String(price.product) : null,
//             status: sub.status,
//             currentPeriodEnd: new Date(sub.current_period_end * 1000),
//           },
//         });

//         // If subscription was created/updated, also set user to premium
//         if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
//           await prisma.user.update({
//             where: { id: userId },
//             data: { subscription: "premium" },
//           });
//         }

//         // If subscription deleted, downgrade user to basic
//         if (event.type === "customer.subscription.deleted") {
//           await prisma.user.update({
//             where: { id: userId },
//             data: { subscription: "basic" },
//           });
//         }
//       }
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error("Error handling Stripe webhook:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }




















