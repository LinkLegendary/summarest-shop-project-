import { notFound } from "next/navigation";
import HandleCheckoutPage from "@/app/components/HandleCheckoutPage";

export default async function CheckoutPage({
  params,
}: {
  params: { plan: string };
}) {
  const { plan } = await params;

  if (plan !== "yearly" && plan !== "monthly") {
    notFound();
  }

  const isYearly = plan === "yearly";

  return (
    <HandleCheckoutPage
      isYearly={isYearly}
      plan={plan}
    />
  );
}












// import { notFound } from "next/navigation";
// import HandleCheckoutPage from "@/app/components/HandleCheckoutPage";

// export default async function CheckoutPage({
//   params,
// }: {
//   params: { plan: string };
// }) {
//   const { plan } = await params;

//   if (plan !== "yearly" && plan !== "monthly") {
//     notFound();
//   }

//   const isYearly = plan === "yearly";

//   return (
//   <HandleCheckoutPage 
//   isYearly={isYearly} 
//   plan={plan as "yearly" | "monthly"} />);
// }













