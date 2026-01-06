"use client";

import Link from "next/link";
import {
  Home,
  Bookmark,
  PenLine,
  Search,
  Settings,
  HelpCircle,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LetterSizeSidebar from "./LetterSizeSidebar";

export default function SideBar({ onItemClick }: { onItemClick?: () => void }) {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <aside className="h-full w-56 bg-gray-100 flex flex-col  ">
      <div className="flex items-center px-6 py-4 text-xl font-semibold border-b  border-gray-400 shadow">
        📘 Summarist
      </div>

      <div className="px-6 py-2 text-sm text-gray-700 border-b border-gray-400 shadow">
        Logged in as <br />
        <span className="font-medium truncate">
          {user.displayName || user.email}
        </span>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        <Link href="/for-you" onClick={onItemClick}>
          <SidebarItem icon={<Home size={20} />} label="For you" />
        </Link>
        <Link href="/library">
        <SidebarItem icon={<Bookmark size={20} />} label="My Library" />
        </Link>
        
        
        <SidebarItem 
        icon={<PenLine size={20} />} 
        label="Highlights"
        disabled
       />
       
       
        <SidebarItem 
        icon={<Search size={20} />} 
        label="Search" 
        disabled
        />

         <div className="mt-20"><LetterSizeSidebar /></div>
         
      </nav>

      

      <div className="px-2 py-4 space-y-1 border-t  border-gray-400 shadow">
        <Link href="/settings" onClick={onItemClick}>
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
        </Link>
        <SidebarItem icon={<HelpCircle size={20} />} label="Help & Support" />
        <SidebarItem
          onClick={() => {
            logout();
            onItemClick?.();
          }}
          icon={<LogIn size={20} />}
          label="Logout"
        />
      </div>
    </aside>
  );
}

const SidebarItem = ({
  icon,
  label,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <div
    onClick={disabled ? undefined : onClick}
   
    className={`
      flex items-center gap-3 px-4 py-2
      ${
        disabled ? "text-gray-400 cursor-default pointer-events-none"
        : "text-gray-700 hover:bg-gray-200 cursor-pointer"
      }

      `}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);












// // app/components/SideBar.tsx
// "use client";

// import Link from "next/link";
// import {
//   Home,
//   Bookmark,
//   PenLine,
//   Search,
//   Settings,
//   HelpCircle,
//   LogIn,
// } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";

// export default function SideBar() {
//   const { user, logout } = useAuth();
//   if (!user) return null;

//   return (
//     <aside className="fixed top-0 left-0 h-screen w-56 bg-gray-100 z-[1500] flex flex-col">
//       <div className="flex items-center px-6 py-4 text-xl font-semibold border-b">
//         📘 Summarist
//       </div>

//       <div className="px-6 py-2 text-sm text-gray-700 border-b">
//         Logged in as <br />
//         <span className="font-medium truncate ">
//           {user.displayName || user.email}
//         </span>
//       </div>

//       <nav className="flex-1 px-2 py-4 space-y-1">
//         <Link href="/for-you">
//           <SidebarItem icon={<Home size={20} />} label="For you" />
//         </Link>
//         <SidebarItem icon={<Bookmark size={20} />} label="My Library" />
//         <SidebarItem icon={<PenLine size={20} />} label="Highlights" />
//         <SidebarItem icon={<Search size={20} />} label="Search" />
//       </nav>

//       <div className="px-2 py-4 space-y-1 border-t">
//         <Link href="/setting">
//           <SidebarItem icon={<Settings size={20} />} label="Settings" />
//         </Link>
//         <SidebarItem icon={<HelpCircle size={20} />} label="Help & Support" />
//         <SidebarItem
//           onClick={logout}
//           icon={<LogIn size={20} />}
//           label="Logout"
//         />
//       </div>
//     </aside>
//   );
// }

// interface SidebarItemProps {
//   icon: React.ReactNode;
//   label: string;
//   onClick?: () => void;
// }

// const SidebarItem = ({ icon, label, onClick }: SidebarItemProps) => (
//   <div
//     onClick={onClick}
//     className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded cursor-pointer"
//   >
//     {icon}
//     <span className="text-sm">{label}</span>
//   </div>
// );

















// "use client"

// import { Home, Bookmark, PenLine, Search, Settings, HelpCircle, LogIn } from "lucide-react";
// // import { useAuth } from "../context/AuthContext";
// import { useAuth } from "@/context/AuthContext";
// import Link from "next/link";

// const SideBar = () => {
//   const { user, openAuthModal, logout } = useAuth();
//    if(!user) return null

//   return (
//     <aside className="fixed top-0 left-0 h-screen w-52 bg-gray-100 flex flex-col pt-12 px-2">
//       {/* TOP */}
//       <div className="space-y-1">
//         {/* Logo */}
//         <div className="flex items-center gap-2 px-6 py-4 text-xl font-semibold"
//         style={{marginBottom:"30px"}}
//         >📘
//          <span>Summarist</span>

//         </div>

//         {/* User Info (if logged in) */}
//         {user && (
//           <div className="px-4 py-2 text-sm text-gray-700 ml-3">
//             Logged in as <br />
//             <span className="font-medium">{user.displayName || user.email}</span>
//           </div>
//         )}

//         {/* Menu */}
//         <nav className="mt-4 space-y-1">
//           <Link href="/for-you">
//           <SidebarItem icon={<Home size={20} />} label="For you" />
//           </Link>

//           <SidebarItem icon={<Bookmark size={20} />} label="My Library" />
//           <SidebarItem icon={<PenLine size={20} />} label="Highlights" />
//           <SidebarItem icon={<Search size={20} />} label="Search" />
//         </nav>
//       </div>

//       {/* BOTTOM */}
//       <div
//       className="px-4 pb-4 space-y-1"
//       style={{marginTop: "440px", marginLeft: "-12px"}}
//       >
//         <Link href="/setting"><SidebarItem icon={<Settings size={20} />} label="Settings" /></Link>

//         <SidebarItem icon={<HelpCircle size={20} />} label="Help & Support" />

//         {/* Login / Logout Button */}
//         {!user ? (
//           <SidebarItem onClick={openAuthModal} icon={<LogIn size={20} />} label="Login" />
//         ) : (
//           <SidebarItem onClick={logout} icon={<LogIn size={20} />} label="Logout" />
//         )}
//       </div>
//     </aside>
//   );
// };

// interface SidebarItemProps {
//   icon: React.ReactNode;
//   label: string;
//   onClick?: () => void;
// }

// const SidebarItem = ({ icon, label, onClick }: SidebarItemProps) => {
//   return (
//     <div onClick={onClick} className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer">
//       {icon}
//       <span className="text-base">{label}</span>
//     </div>
//   );
// };

// export default SideBar;

// // "use client";

// // import React from "react";

// // import {
// //   Home,
// //   Bookmark,
// //   PenLine,
// //   Search,
// //   Settings,
// //   HelpCircle,
// //   LogIn,
// // } from "lucide-react";

// // import { useAuth } from "../context/AuthContext ";

// // const SideBar = () => {
// //   const { isLoggedIn, openAuthModal, closeAuthModal,login,logout} = useAuth();

// //  if (!isLoggedIn) return null;

// //   return (
// //     <aside
// //       className="fixed top-0 left-0 h-screen w-40 bg-gray-100  flex flex-col justify-between pt-12"
// //       style={{ paddingTop: "20px", paddingBottom: "20px", paddingLeft: "10px" }}
// //     >
// //       {/* TOP */}
// //       <div>
// //         {/* Logo */}
// //         <div className="flex items-center gap-2 px-6 py-4 text-xl font-semibold">
// //           📘 <span>Summarist</span>
// //         </div>

// //         {/* Menu */}
// //         <nav className="mt-4 space-y-1">
// //           <SidebarItem icon={<Home size={20} />} label="For you" />
// //           <SidebarItem icon={<Bookmark size={20} />} label="My Library" />
// //           <SidebarItem icon={<PenLine size={20} />} label="Highlights" />
// //           <SidebarItem icon={<Search size={20} />} label="Search" />
// //         </nav>
// //       </div>

// //       {/* BOTTOM */}
// //       <div className="px-4 pb-4 space-y-2">
// //         <SidebarItem icon={<Settings size={20} />} label="Settings" />
// //         <SidebarItem icon={<HelpCircle size={20} />} label="Help & Support" />
// //         {!isLoggedIn ? (
// //           <SidebarItem
// //           onClick={openAuthModal}
// //          icon={<LogIn size={20} />}
// //          label="Login"
// //           />

// //         ) : (
// //          <SidebarItem
// //           onClick={logout}
// //           icon={<LogIn size={20} />}
// //           label="Logout"
// //            />
// //         )}
// //       </div>
// //     </aside>
// //   );
// // };

// // interface SidebarItemProps {
// //   icon: React.ReactNode;
// //   label: string;
// //   onClick?: () => void;
// // }

// // const SidebarItem = ({ icon, label, onClick }: SidebarItemProps) => {
// //   return (
// //     <div
// //     onClick={onClick}
// //     className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer"
// //     >
// //       {icon}
// //       <span className="text-base">{label}</span>
// //     </div>
// //   );
// // };

// // export default SideBar;

// "use client";

// import { useAuth } from "@/context/AuthContext";
// import NavClient from "./NavClient";
// import Link from "next/dist/client/link";

// // import { useAuth } from "../context/AuthContext";

// export default function Sidebar() {
//   const { logout } = useAuth();

//   return (
//     <>
//       <div
//         className="bg-white h-screen border-r border-gray-300 flex flex-col justify-between"

//       >
//         <div className="w-64 bg-gray-200 p-4 text-black">Sidebar</div>
//         <Link href="/sun">
//          <NavClient />
//         </Link>

//         <button className="bg-blue-500 text-white px-4 py-2 rounded">login</button>
//         <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">logout</button>
//       </div>
//     </>
//   );
// }
