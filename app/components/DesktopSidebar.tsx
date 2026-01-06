"use client";

import SideBar from "./SideBar";

export default function DesktopSidebar() {
  return (
    <div className="hidden lg:block fixed top-0 left-0 h-screen w-56 border-r z-100">
      <SideBar />
    </div>
  );
}