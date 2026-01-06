
"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/context/AuthContext";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { showModal2, setShowModal2 } = useAuth();

  if (!showModal2) return null;

  const handleSignup = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/for-you");
      setShowModal2(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("Signup failed");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setShowModal2(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Create your account</h1>
          <button
            onClick={() => setShowModal2(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            onClick={handleSignup}
            className="mt-2 w-full rounded-md bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Create account
          </button>
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-gray-500">
          By signing up, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
















// "use client";

// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../lib/firebase";
// import { useRouter } from "next/navigation";
// import { FirebaseError } from "firebase/app";
// import { useAuth } from "@/context/AuthContext";


// // interface SignUpProps { 
// //   showModal2: boolean;
// //   setShowModal2: (show: boolean) => void;
// // }

// export default function SignUp() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const {showModal2, setShowModal2 } = useAuth();

//   if (!showModal2) return null;

//   const handleSignup = async () => {
//     setError("");
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       router.replace("/for-you");
//       setShowModal2(false)
//     } catch (error) {
//       if (error instanceof FirebaseError) {
//         setError(error.message);
//       } else {
//         setError("Signup failed");
//       }
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="w-full max-w-md border p-6 rounded bg-amber-400">
//         <div className="flex justify-between">
//           <h1 className="text-xl font-bold mb-4">Create Account</h1>
//           <button 
//             className="font-bold pb-6"
//             onClick={() => setShowModal2(false)}
//           >
//             x
//           </button> 
//         </div>
        
//         <input
//           type="email"
//           placeholder="Email---"
//           className="w-full border px-3 py-2 mb-2"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border px-3 py-2 mb-2"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <button
//           onClick={handleSignup}
//           className="w-full h-11 border border-red-500 text-blue-600 rounded mt-3 hover:bg-red-50"
//         >
//           Sign Up
//         </button>
//       </div>
//     </div>
//   );
// }














// "use client";

// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../lib/firebase";
// import { useRouter } from "next/navigation";
// import { FirebaseError } from "firebase/app";
// import { useAuth } from "@/context/AuthContext";

// const interface SignUpProps { 
//     showModal2: boolean;
//     setShowModal2: (show: boolean) => void;
//   }

// export default function SignUp() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { showModal2, setShowModal2 } = useState<signUpProp>(false);  

//    if (!showModal2) return null;

//   const handleSignup = async () => {
//     setError("");
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       router.replace("/for-you");
   
      
//     } catch (error) {
//       if (error instanceof FirebaseError) {
//         setError(error.message);
//       } else {
//         setError("Signup failed");
//       }
//     }
//   };

  


//   return (
//     <div className="fixed inset-0  flex items-center justify-center z-50">
//       <div className="w-full max-w-md border p-6 rounded bg-amber-400">
//         <div className="flex justify-between">
//            <h1 className="text-xl font-bold mb-4">Create Account</h1>
//          <button 
//          className="font-bold pb-6 from-neutral-800 "
//             onClick={() => setShowModal2(false)}
//          >x
//          </button> 
//         </div>
        
//         <input
//           type="email"
//           placeholder="Email---"
//           className="w-full border px-3 py-2 mb-2"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border px-3 py-2 mb-2"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <button
//           onClick={handleSignup}
//           className="
//         w-full
//     h-11
//     border
//     border-red-500
//     text-blue-600
//     rounded
//     mt-3
//     hover:bg-red-50
//           "
         
//         >
//           Sign Up
//         </button>
//       </div>
//     </div>
//   );
// }