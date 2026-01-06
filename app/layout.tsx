"use client";

import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import DesktopSidebar from "./components/DesktopSidebar";
import MobileSidebar from "./components/MobileSidebar";
import AuthModal from "./components/AuthModal";
import SignUp from "./components/SignUp";


function LayoutContent({ children }: { children: ReactNode }) {
  const { isLoggedIn, authReady, showModal } = useAuth();
  if (!authReady) return null;

  return (
    <div className="flex">
      {isLoggedIn && <DesktopSidebar />}
      {isLoggedIn && <MobileSidebar />}
      {/* {isLoggedIn && <SearchPage />} */}

      <main className={`flex-1 min-h-screen bg-white overflow-x-hidden ${
        isLoggedIn ? "lg:ml-56" : ""
      }`}>
        {children}
        {showModal ? <AuthModal /> : <SignUp />}
      </main>
    </div>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}




















// "use client";

// import "./globals.css";


// import { ReactNode } from "react";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import Sidebar from "./components/SideBar";
// import AuthModal from "./components/AuthModal";
// import SignUp from "./components/SignUp";

// import MobileSidebar from "@/app/components/MobileSidebar";


// function LayoutContent({ children }: { children: ReactNode }) {
//   const { isLoggedIn, authReady , showModal } = useAuth();
//   if (!authReady) return null;

//   return (
//     <div className="flex ">
//        {/* Desktop Sidebar */}
//       {isLoggedIn && <Sidebar />}
//         {/* Mobile Sidebar */}
//       <MobileSidebar />


//       <main className="flex-1 lg:ml-56 min-h-screen bg-white ">
//         {children}
//        {showModal ? <AuthModal /> : <SignUp />}
      
//       </main>
      
     
//     </div>
//   );
// }

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html>
//       <body>
        
//          <AuthProvider>
//       <LayoutContent>{children}</LayoutContent>
//     </AuthProvider>
//       </body>
//     </html>
   
//   );
// }