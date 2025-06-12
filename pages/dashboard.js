"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PersonalDetails from "../components/PersonalDetails";
import EducationDetails from "../components/EducationDetails";
import ProfessionalDetails from "../components/ProfessionalDetails";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    fetchUser(decoded.userId);

    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const fetchUser = async (id) => {
    try {
      const res = await fetch(`/api/user/${id}`);
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Error fetching user", err);
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-blue-50 p-6">
  {/* Header Section */}
  <div className="max-w-6xl mx-auto mb-12">
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between">
      <div>
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{greeting}, <span className="text-indigo-600">{user?.name || "User"}</span></h2>
        <p className="mt-1 text-gray-500 text-base">Welcome to your modern dashboard experience</p>
      </div>
      <img
        src={user?.profileImage || "/default-profile.png"}
        alt="Profile"
        className="w-28 h-28 rounded-full border-4 border-indigo-200 shadow-lg transition-transform hover:scale-105"
      />
    </div>
  </div>

  {/* Vertical Tabs Layout */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ">
    {/* Sidebar Navigation */}
    <div className=" backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-4 flex flex-col gap-2 relative">
      {/* Active tab indicator */}
      <div
        className={`absolute left-0 top-0 w-1 bg-indigo-500 rounded-r-full transition-all duration-300 ${
          activeTab === "personal" ? "mt-2" : activeTab === "education" ? "mt-[68px]" : "mt-[134px]"
        } h-12`}
      />

      {/* Tabs */}
      {[
        { id: "personal", label: "Personal", icon: "👤" },
        { id: "education", label: "Education", icon: "🎓" },
        { id: "professional", label: "Professional", icon: "💼" },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium transition-all duration-300 relative z-10 ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
              : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-700"
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          {tab.label} Details
        </button>
      ))}
    </div>

    {/* Content Area */}
    <div className="md:col-span-3  rounded-2xl shadow-xl  p-6 transition-all">
      {!user && <p className="text-center text-gray-400">Loading...</p>}
      {user && activeTab === "personal" && <PersonalDetails user={user} />}
      {user && activeTab === "education" && <EducationDetails user={user} />}
      {user && activeTab === "professional" && <ProfessionalDetails user={user} />}
    </div>
  </div>
</div>





  );
}
