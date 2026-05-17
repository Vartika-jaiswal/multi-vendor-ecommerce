import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }

          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}


      {/* SIDEBAR */}

      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen transition-all duration-300
          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <Sidebar
          setSidebarOpen={
            setSidebarOpen
          }
        />
      </div>


      {/* MAIN CONTENT */}

      <div className="flex-1 flex flex-col min-w-0">

        <Navbar
          setSidebarOpen={
            setSidebarOpen
          }
        />

        <main className="p-4 lg:p-5">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;