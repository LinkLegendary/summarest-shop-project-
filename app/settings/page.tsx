"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import SearchPage from "../components/SearchPage";


export default function SettingPage() {
  const { user, dbUser, loading } = useAuth(); // refreshUser to reload latest data
  const router = useRouter();
  

  const handleUpgrade = async () => {
    if (!user) return;

    const res = await fetch("/api/set-premium", {
      method: "POST",
      body: JSON.stringify({ userId: user.uid }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Subscription set to Premium (Test)");
      // Optionally refresh user state
      router.refresh(); // Next.js App Router
    } else {
      router.push("/choose-plan");
      // alert("Failed to update subscription");
    }
  };

  return (
    <div className="mt-8 mx-auto px-6">
      <SearchPage />

      <div className="w-full overflow-x-hidden mx-auto flex-1 mt-16 flex justify-center px-4">
        <div className="w-full max-w-xl">
          <h1 className="font-extrabold text-3xl mb-6">Settings</h1>

          {/* Subscription Section */}
          <div className="my-4">
            <h1 className="mb-2 text-lg font-semibold">
              Your Subscription Plan
            </h1>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <p className="capitalize">{dbUser?.subscription ?? "basic"}</p>
            )}

            {dbUser?.subscription === "basic" && (
              <button 
              onClick={handleUpgrade}
              className="bg-green-200 rounded p-1 mt-2"
              >
                Upgrade
            </button>
            )}
          </div>

          {/* Divider */}
          <div className="bg-gray-300 h-px mt-8 w-full"></div>

          {/* Email Section */}
          <div className="mt-4">
            <h1 className="font-semibold">Email:</h1>
            <h1 className="text-gray-700 break-all">
              {user?.email || "No email available"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import SearchPage from "../components/SearchPage";
// import {  useState } from "react";

// export default function SettingPage() {
//   const { user } = useAuth(); // refreshUser to reload latest data
//   const router = useRouter();
//   const [subscription] = useState<"basic" | "premium">(
//     "basic"
//   );

//   const handleUpgrade = () => {
//     // Redirect to choose-plan
//     router.push("/choose-plan");
//   };

//   return (
//     <div className="mt-8 mx-auto px-6">
//       <SearchPage />

//       <div className="w-full overflow-x-hidden mx-auto flex-1 mt-16 flex justify-center px-4">
//         <div className="w-full max-w-xl">
//           <h1 className="font-extrabold text-3xl mb-6">Settings</h1>

//           {/* Subscription Section */}
//           <div className="my-4">
//             <h1 className="mb-2 text-lg font-semibold">Your Subscription Plan</h1>
//             <h1 className="text-gray-700 mb-3 capitalize">{subscription}</h1>

//             {subscription === "basic" && (
//               <div
//                 onClick={handleUpgrade}
//                 className="bg-green-500 text-white text-center py-2 rounded cursor-pointer hover:bg-green-600 transition w-full sm:w-1/2"
//               >
//                 Upgrade to Premium
//               </div>
//             )}
//           </div>

//           {/* Divider */}
//           <div className="bg-gray-300 h-px mt-8 w-full"></div>

//           {/* Email Section */}
//           <div className="mt-4">
//             <h1 className="font-semibold">Email:</h1>
//             <h1 className="text-gray-700 break-all">
//               {user?.email || "No email available"}
//             </h1>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

