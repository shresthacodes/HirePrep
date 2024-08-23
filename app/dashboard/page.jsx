import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";

function Dashboard() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl" style={{ color: "#d10a54" }}>
        Dashboard
      </h2>
      <p className="text-gray-500">Welcome to your AI Mock Interview.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
    </div>
  );
}

export default Dashboard;
