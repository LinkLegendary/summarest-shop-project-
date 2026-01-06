"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function AuthModal() {
  const {
    showModal,
    closeAuthModal,
    login,
    loginWithGoogle,
    forgotPassword,
    setShowModal2,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!showModal) return null;

  const handleLogin = async () => {
    setSuccess("");
    setError("");
    const err = await login(email, password);
    if (err) setError(err);
  };

  const handleForgotPassword = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Enter your email first");
      return;
    }

    const err = await forgotPassword(email);
    if (err) setError(err);
    else setSuccess("Password reset email sent");
  };

  const handleSignUp = () => {
    closeAuthModal();
    setShowModal2(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login to Summarist
        </h2>

        {/* Google Login Button */}
        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
        >
          {/* <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Icon"
            className="w-5 h-5"
          /> */}
          <Image
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Icon"
            width={30}
            height={30}
            priority
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-2.5 rounded-lg mb-3 focus:ring-2 focus:ring-black focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 px-4 py-2.5 rounded-lg mb-3 focus:ring-2 focus:ring-black focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error / Success Messages */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition"
        >
          Login
        </button>

        {/* Footer Links */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password
          </button>

          <button onClick={handleSignUp}>
            <span className="text-sm text-blue-600 hover:underline">
              Don’t have an account
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";

// import { useAuth } from "@/context/AuthContext";

// export default function AuthModal() {

//   const {} = useAuth();

//   const { showModal, closeAuthModal, login, loginWithGoogle, forgotPassword, setShowModal2 } =
//     useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   if (!showModal) return null;

//   const handleLogin = async () => {
//     setSuccess("");
//     setError("");
//     const err = await login(email, password);
//     if (err) setError(err);
//   };

//   const handleForgotPassword = async () => {
//     setError("");
//     setSuccess("");

//     if (!email) {
//       setError("Enter your email first");
//       return;
//     }

//     const err = await forgotPassword(email);
//     if (err) setError(err);
//     else setSuccess("Password reset email sent");
//   };

//   const handleSignUp = () => {
//     // router.push("/signup");
//     closeAuthModal();
//    setShowModal2(true);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
//         <button
//           onClick={closeAuthModal}
//           className="absolute top-4 right-4 text-gray-500"
//         >
//           ✕
//         </button>

//         <h2 className="text-xl font-bold text-center mb-4">
//           Log in to Summarist
//         </h2>

//         <button
//           onClick={loginWithGoogle}
//           className="w-full border py-2 rounded mb-3"
//         >
//           Login with Google
//         </button>

//         <input
//           type="email"
//           placeholder="Email"
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
//         {success && <p className="text-green-600 text-sm">{success}</p>}

//         <button
//           onClick={handleLogin}
//           className="w-full bg-black text-white border-amber-400 py-2 rounded mt-3"
//           style={{ border: "solid black", width: "80px" }}
//         >
//           Login
//         </button>
//         <br />

//         <div className="flex justify-between">
//           <button
//             onClick={handleForgotPassword}
//             className="text-sm text-blue-600 mt-3"
//           >
//             Forgot password?
//           </button>
//           <button className="ml-16" onClick={handleSignUp}>
//             <h1 className="text-sm text-blue-600 mt-3 ">
//               Don`t have an account?
//             </h1>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// // import { useAuth } from "../context/AuthContext";
// import { useAuth } from "../context/AuthContext ";

// type Tab = "login" | "signup" | "forgot";

// export default function AuthModal() {
//   const { showModal, closeAuthModal, login, loginWithGoogle, forgotPassword } = useAuth();

//   const [tab, setTab] = useState<Tab>("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [displayName, setDisplayName] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!showModal) return null;

//   const resetState = () => {
//     setEmail("");
//     setPassword("");
//     setDisplayName("");
//     setError("");
//     setMessage("");
//     setLoading(false);
//   };

//   const handleLogin = async () => {
//     setError("");
//     setMessage("");
//     setLoading(true);
//     const err = await login(email, password);
//     if (err) setError(err);
//     setLoading(false);
//   };

//   const handleGoogle = async () => {
//     setError("");
//     setMessage("");
//     setLoading(true);
//     const err = await loginWithGoogle();
//     if (err) setError(err);
//     setLoading(false);
//   };

//   const handleForgot = async () => {
//     setError("");
//     setMessage("");
//     setLoading(true);
//     const err = await forgotPassword(email);
//     if (err) setError(err);
//     else setMessage("Check your email for reset link!");
//     setLoading(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
//         <button
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//           onClick={() => {
//             closeAuthModal();
//             resetState();
//           }}
//         >
//           ✕
//         </button>

//         {/* Tabs */}
//         <div className="flex justify-center gap-4 mb-4">
//           <button
//             className={`px-3 py-1 rounded ${
//               tab === "login" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setTab("login")}
//           >
//             Login
//           </button>
//           <button
//             className={`px-3 py-1 rounded ${
//               tab === "signup" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setTab("signup")}
//           >
//             Sign Up
//           </button>
//           <button
//             className={`px-3 py-1 rounded ${
//               tab === "forgot" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setTab("forgot")}
//           >
//             Forgot
//           </button>
//         </div>

//         {/* Messages */}
//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//         {message && <p className="text-green-500 text-sm mb-2">{message}</p>}

//         {/* Form */}
//         {tab !== "forgot" && (
//           <>
//             {tab === "signup" && (
//               <input
//                 type="text"
//                 placeholder="Display Name"
//                 className="w-full border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={displayName}
//                 onChange={(e) => setDisplayName(e.target.value)}
//               />
//             )}

//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             {/* Email/Password Button */}
//             <button
//               onClick={tab === "login" ? handleLogin : undefined}
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded mb-3"
//             >
//               {loading ? "Please wait..." : tab === "login" ? "Login" : "Sign Up"}
//             </button>

//             {/* Google Button */}
//             <button
//               onClick={handleGoogle}
//               className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded flex items-center justify-center"
//             >
//               <img src="/google-logo.svg" alt="Google" className="w-5 h-5 mr-2" />
//               Continue with Google
//             </button>
//           </>
//         )}

//         {/* Forgot Password Form */}
//         {tab === "forgot" && (
//           <>
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <button
//               onClick={handleForgot}
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
//             >
//               Send Reset Email
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useAuth } from "../context/AuthContext ";

// export default function AuthModal() {
//   const { showModal, closeAuthModal, login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   if (!showModal) return null;

//   const handleSubmit = () => {
//     const err = login(email, password);
//     if (err) setError(err);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
//         <button
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//        onClick={() => closeAuthModal()}
//         >
//           ✕
//         </button>

//         <h2 className="text-2xl font-bold text-center mb-6">Log in to Summarist</h2>

//         <button
//           className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded flex items-center justify-center mb-4"
//           onClick={() => login("guest@gmail.com", "guest123")}
//         >
//           Login as a Guest
//         </button>

//         <div className="flex items-center mb-4">
//           <div className="flex-grow border-t border-gray-300" />
//           <span className="mx-2 text-sm text-gray-500">or</span>
//           <div className="flex-grow border-t border-gray-300" />
//         </div>

//         <button
//           className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded flex items-center justify-center mb-4"
//         >
//           <img src="/google-logo.svg" alt="Google" className="w-5 h-5 mr-2" />
//           Login with Google
//         </button>

//         <div className="flex items-center mb-4">
//           <div className="flex-grow border-t border-gray-300" />
//           <span className="mx-2 text-sm text-gray-500">or</span>
//           <div className="flex-grow border-t border-gray-300" />
//         </div>

//         <input
//           type="email"
//           placeholder="Email Address"
//           className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

//         <button
//           onClick={handleSubmit}
//           className="w-full  hover:bg-blue-700 bg-amber-300 font-semibold py-2 rounded mt-2 h-4 w-5 "
//           style={{backgroundColor: "gray", width: "50px", height: "20px"}}
//         >
//           Login
//         </button>

//         <div className="flex justify-between text-sm text-blue-600 mt-4">
//           <button className="hover:underline">Forgot your password?</button>
//           <button className="hover:underline">Don't have an account?</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useAuth } from "@/context/AuthContext";

// export default function AuthModal() {
//   const { showModal, closeAuthModal, loginWithGoogle } = useAuth();

//   if (!showModal) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded">
//         <h2 className="text-xl font-bold mb-4">Login</h2>
//         <button
//           onClick={loginWithGoogle}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Login with Google
//         </button>
//         <button onClick={closeAuthModal} className="mt-2 text-gray-500">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }
