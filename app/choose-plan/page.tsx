"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const FAQS = [
  {
    q: "How does the free 7-day trial work?",
    a: "You can start your 7-day free trial with the yearly plan. You will not be charged until the trial ends, and you can cancel anytime before that.",
  },
  {
    q: "Can I switch between monthly and yearly plans?",
    a: "Yes, you can switch plans anytime from your account settings.",
  },
  {
    q: "What's included in the Premium plan?",
    a: "Unlimited access to all books, summaries, recommendations, and future updates.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel during your trial or subscription at any time.",
  },
];

export default function ChoosePlanPage() {
  const [plan, setPlan] = useState<"yearly" | "monthly">("yearly");
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);

  const selectPlan = () => {
    if (isloading) return;
    setIsLoading(true);
    if (plan === "yearly") router.push(`/checkout/yearly`);
    else {
      router.push(`/checkout/monthly`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
       {isloading && (
  <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
)}


      {/* HERO */}
      <section className="bg-[#0F2A44] text-white pt-20 pb-32 text-center relative">
        <h1 className="text-4xl font-bold">
          Get unlimited access to many amazing books to read
        </h1>
        <p className="mt-4 text-gray-300">
          Turn ordinary moments into amazing learning opportunities
        </p>

        <div className="absolute left-1/2 -bottom-24 -translate-x-1/2 ">
          <Image
            src="/landing.png" // replace later
            alt="App preview"
            width={260}
            height={260}
            className="rounded-full bg-white p-6"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto mt-32 px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <Feature title="Key ideas in few minutes" desc="Read many books fast" />
        <Feature title="3M+ users" desc="Growing with Summarist every day" />
        <Feature title="Precise recommendations" desc="Curated by experts" />
      </section>

      {/* PLANS */}
      <section className="max-w-3xl mx-auto mt-24 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-8">
          Choose the plan that fits you
        </h2>

        <div className="space-y-6">
          {/* YEARLY */}
          <PlanCard
            active={plan === "yearly"}
            onClick={() => setPlan("yearly")}
            title="Premium Plus Yearly"
            price="$99 / year"
            note="7-day free trial included"
          />

          <div className="text-gray-400">or</div>

          {/* MONTHLY */}
          <PlanCard
            active={plan === "monthly"}
            onClick={() => setPlan("monthly")}
            title="Premium Monthly"
            price="$9.99 / month"
            note="No trial included"
          />
        </div>

        <button
          onClick={selectPlan}
          className={`mt-10 bg-green-500
         hover:bg-green-600 text-white px-8 py-3 rounded-md font-medium transition
         ${
           isloading
             ? "bg-gray-400 cursor-not-allowed"
             : "bg-green-500 hover:bg-green-600 text-white"
         }
        `}
        >
          {isloading
            ? "Redirecting..."
            : plan === "yearly"
            ? "Start your free 7-day trial"
            : "Subscribe monthly"}

         
        </button>

        <p className="text-xs text-gray-400 mt-2">
          Cancel anytime before trial ends. No charges during trial.
        </p>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto mt-24 px-6">
        {FAQS.map((faq, i) => (
          <div key={i} className="border-b py-4">
            <button
              className="w-full text-left font-medium flex justify-between items-center"
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              // onClick={() => setOpenFAQ(i )}
            >
              {faq.q}
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  openFAQ === i ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* <button
              className="w-full text-left font-medium flex justify-between"
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
            >
              {faq.q}
              <span>{openFAQ === i ? "−" : "+"}</span>
            </button> */}

            {openFAQ === i && (
              <p className="mt-3 text-gray-600 text-sm">{faq.a}</p>
            )}
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="mt-32 bg-gray-50 py-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} YourApp. All rights reserved.
      </footer>




    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );
}

function PlanCard({
  active,
  onClick,
  title,
  price,
  note,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  price: string;
  note: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border rounded-lg p-6 text-left transition ${
        active ? "border-green-500 bg-green-50" : "border-gray-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <input type="radio" checked={active} readOnly />
        <div>
          <p className="font-medium">{title}</p>
          <p className="font-semibold">{price}</p>
          <p className="text-xs text-gray-500">{note}</p>
        </div>
      </div>
    </div>
  );
}
