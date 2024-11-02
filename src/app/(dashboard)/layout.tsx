import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen relative">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-50 bg-gray-900 w-64">
        {/* Sidebar content */}
        <Sidebar />
      </div>

      {/* Main content area */}
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
