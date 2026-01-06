"use client";

import { useAuth } from "@/context/AuthContext";





type HandleCheckoutPageProps = {
  isYearly: boolean;
  plan: "yearly" | "monthly";
};

export default function HandleCheckoutPage({
  isYearly,
  plan,
}: HandleCheckoutPageProps) {

const { user } = useAuth();
 

    

  async function handleCheckout() {
      if (!user) {
    alert("You must be logged in to subscribe!");
    return;
  }



    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        plan,
          userId: user.uid,   // ✅ this is critical
        email: user.email,  // optional but useful for Stripe
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    // UI here
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-center gap-3 ml-10 mt-1">
          <span className="font-semibold text-lg">Summarist</span>
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
            TEST MODE
          </span>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* LEFT — PLAN SUMMARY */}
        <section>
          <p className="text-sm text-gray-500 mb-2">
            Subscribe to Summarist Premium Plus
          </p>

          <div className="flex items-end gap-2">
            <h1 className="text-4xl font-bold">
              {isYearly ? "$99.00" : "$9.99"}
            </h1>
            <span className="text-gray-500">
              {isYearly ? "per year" : "per month"}
            </span>
          </div>

          {isYearly && (
            <p className="mt-4 text-sm text-green-600 font-medium">
              ✓ 7-day free trial included
            </p>
          )}
        </section>

        {/* RIGHT — STRIPE CHECKOUT PREVIEW */}
        <section className="border rounded-xl p-6 shadow-sm">
          {/* Express checkout preview */}
          <button
            disabled
            className="w-full bg-black text-white py-3 rounded-md font-medium opacity-90 cursor-not-allowed"
          >
            Google Pay
          </button>

          <div className="text-center text-sm text-gray-400 my-4">OR</div>

          {/* Stripe-style placeholder */}
          <div className="border rounded-md p-4 text-sm text-gray-500 space-y-3 bg-gray-50">
            <div className="h-3 w-2/3 bg-gray-200 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
          </div>

          {/* CTA */}
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md mt-6 font-medium transition"
          >
            Continue to secure checkout
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            You’ll be redirected to Stripe to complete your purchase securely.
          </p>

          <p className="text-xs text-gray-400 text-center mt-2">
            Powered by Stripe · Terms · Privacy
          </p>
        </section>
      </main>
    </div>
  );
}










// "use client";

// type HandleCheckoutPageProps = {
//   isYearly: boolean;
//   plan: "yearly" | "monthly";
// };

// export default function HandleCheckoutPage({
//   isYearly,
//   plan,
// }: HandleCheckoutPageProps) {



//   async function handleCheckout() {
//     const res = await fetch("/api/checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ plan }),
//     });

//     const data = await res.json();
//     window.location.href = data.url;
//   }




//   return (
//     <div className="min-h-screen bg-white ">
//       {/* HEADER */}
//       <header className="w-full bg-gray-300">
//         <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-center gap-3">
//           <span className="font-semibold text-lg ml-11 md:ml-10">
//             Summarist
//           </span>
//           <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
//             TEST MODE
//           </span>
//         </div>
//       </header>

//       {/* CONTENT */}
//       <main className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-20">
//         {/* LEFT — PLAN SUMMARY */}
//         <section>
//           <p className="text-sm text-gray-500">
//             Subscribe to Summarist Premium Plus
//           </p>

//           <div className="mt-4 flex items-end gap-2">
//             <h1 className="text-4xl font-bold">
//               {isYearly ? "$99.00" : "$9.99"}
//             </h1>
//             <span className="text-gray-500">
//               {isYearly ? "per year" : "per month"}
//             </span>
//           </div>
//         </section>

//         {/* RIGHT — STRIPE FORM */}
//         <section className="border rounded-xl p-6 shadow-sm">
//           {/* Google Pay */}
//           <button className="w-full bg-black text-white py-3 rounded-md mb-4 font-medium">
//             G Pay
//           </button>

//           <div className="text-center text-sm text-gray-400 mb-4">OR</div>

//           {/* Email */}
//           <label className="text-sm font-medium">Email</label>
//           <input
//             type="email"
//             defaultValue="mybizinfo4567@gmail.com"
//             className="w-full mt-1 mb-4 border rounded-md px-3 py-2"
//           />

//           {/* Card */}
//           <label className="text-sm font-medium">Payment method</label>

//           <input
//             placeholder="1234 1234 1234 1234"
//             className="w-full mt-2 border rounded-md px-3 py-2"
//           />

//           <div className="grid grid-cols-2 gap-2 mt-2">
//             <input
//               placeholder="MM / YY"
//               className="border rounded-md px-3 py-2"
//             />
//             <input placeholder="CVC" className="border rounded-md px-3 py-2" />
//           </div>

//           {/* Name */}
//           <label className="text-sm font-medium mt-4 block">
//             Cardholder name
//           </label>
//           <input
//             placeholder="Full name on card"
//             className="w-full border rounded-md px-3 py-2 mt-1"
//           />

//           {/* Billing */}
//           <label className="text-sm font-medium mt-4 block">
//             Billing address
//           </label>
//           <select className="w-full border rounded-md px-3 py-2 mt-1">
//             <option>United States</option>
//           </select>

//           {/* Submit */}
//           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md mt-6 font-medium">
//             Subscribe
//           </button>

//           <p className="text-xs text-gray-400 text-center mt-4">
//             By subscribing, you authorize Summarist to charge you according to
//             the terms until you cancel.
//           </p>

//           <p className="text-xs text-gray-400 text-center mt-4">
//             Powered by Stripe · Terms · Privacy
//           </p>
//         </section>
//       </main>
//     </div>
//   );
// }








// "use client";

// type HandleCheckoutPageProps = {
//   isYearly: boolean;
//   plan: "yearly" | "monthly";
// };

// export default function HandleCheckoutPage({
//   isYearly,
//   plan,
// }: HandleCheckoutPageProps) {
//   async function handleCheckout() {
//     const res = await fetch("/api/checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ plan }),
//     });

//     const data = await res.json();
//     window.location.href = data.url;
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* HEADER */}
//       <header className="px-6 py-4 border-b font-semibold">
//         Summarist{" "}
//         <span className="ml-2 text-xs bg-yellow-100 px-2 rounded">
//           TEST MODE
//         </span>
//       </header>

//       <main className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-20">
//         {/* LEFT */}
//         <section>
//           <p className="text-sm text-gray-500">
//             Subscribe to Summarist Premium Plus
//           </p>
//           <div className="mt-4 flex items-end gap-2">
//             <h1 className="text-4xl font-bold">
//               {isYearly ? "$99.00" : "$9.99"}
//             </h1>
//             <span className="text-gray-500">
//               {isYearly ? "per year" : "per month"}
//             </span>
//           </div>
//         </section>

//         {/* RIGHT */}
//         <section className="border rounded-xl p-6 shadow-sm">
//           <button className="w-full bg-black text-white py-3 rounded-md mb-4">
//             G Pay
//           </button>

//           <div className="text-center text-sm text-gray-400 mb-4">OR</div>

//           <button
//             onClick={handleCheckout}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
//           >
//             Subscribe
//           </button>

//           <p className="text-xs text-gray-400 text-center mt-4">
//             Powered by Stripe · Terms · Privacy
//           </p>
//         </section>
//       </main>
//     </div>
//   );
// }

// type HandleCheckoutPageProps = {
//   isYearly: boolean;
//   handleCheckout: () => Promise<void>;
// };

// const HandleCheckoutPage = ({ isYearly, handleCheckout }: HandleCheckoutPageProps) => {
//   return (
//     <div>
//        <div className="min-h-screen bg-white">
//       {/* HEADER */}
//       <header className="px-6 py-4 border-b font-semibold">
//         Summarist <span className="ml-2 text-xs bg-yellow-100 px-2 rounded">TEST MODE</span>
//       </header>

//       <main className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-20">
//         {/* LEFT */}
//         <section>
//           <p className="text-sm text-gray-500">
//             Subscribe to Summarist Premium Plus
//           </p>
//           <div className="mt-4 flex items-end gap-2">
//             <h1 className="text-4xl font-bold">
//               {isYearly ? "$99.00" : "$9.99"}
//             </h1>
//             <span className="text-gray-500">
//               {isYearly ? "per year" : "per month"}
//             </span>
//           </div>
//         </section>

//         {/* RIGHT */}
//         <section className="border rounded-xl p-6 shadow-sm">
//           <button className="w-full bg-black text-white py-3 rounded-md mb-4">
//             G Pay
//           </button>

//           <div className="text-center text-sm text-gray-400 mb-4">OR</div>

//           <button
//             onClick={handleCheckout}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
//           >
//             Subscribe
//           </button>

//           <p className="text-xs text-gray-400 text-center mt-4">
//             Powered by Stripe · Terms · Privacy
//           </p>
//         </section>
//       </main>
//     </div>
//     </div>
//   )
// }

// export default HandleCheckoutPage
