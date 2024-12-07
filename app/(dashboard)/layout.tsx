"use client";
import React from "react";
import SideBar from "./_components/SideBar";
import DashboardHeader from "./_components/DashboardHeader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="md:w-64 hidden md:block fixed">
        <SideBar />
      </div>

      <div className="md:ml-64 h-screen">
        <DashboardHeader />
        <div className="min-h-full p-2 bg-gray-100 dark:bg-gray-900">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
