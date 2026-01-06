"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import SideBar from "./SideBar";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-56 bg-gray-100 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:hidden
        `}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4"
        >
          <X size={22} />
        </button>

        <SideBar onItemClick={() => setOpen(false)} />
      </div>
    </>
  );
}












// "use client";

// import { Menu, X } from "lucide-react";
// import { useState } from "react";
// import SideBar from "./SideBar";

// export default function MobileSidebar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Hamburger Button */}
//       <button
//         onClick={() => setOpen(true)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow"
//       >
//         <Menu size={22} />
//       </button>

//       {/* Overlay */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 bg-black/40 z-40"
//         />
//       )}

//       {/* Slide-in Sidebar */}
//       <div
//         className={`
//           fixed top-0 left-0 h-screen w-56 bg-gray-100 z-50
//           transform transition-transform duration-300
//           ${open ? "translate-x-0" : "-translate-x-full"}
//           lg:hidden
//         `}
//       >
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute top-4 right-4"
//         >
//           <X size={22} />
//         </button>

//         <SideBar />
//       </div>
//     </>
//   );
// }