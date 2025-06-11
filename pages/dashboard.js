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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">{greeting},</h2>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mt-1">
            {user?.name || "User"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Welcome to your personalized dashboard</p>
        </div>
        <div className="shrink-0">
          <img
            src={user.profileImage || '/default-profile.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 shadow-lg"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-4">
        <div className="flex gap-4 mb-6 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab("personal")}
            className={`px-4 py-2 rounded-t-md font-medium ${
              activeTab === "personal"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`px-4 py-2 rounded-t-md font-medium ${
              activeTab === "education"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Education Details
          </button>
          <button
            onClick={() => setActiveTab("professional")}
            className={`px-4 py-2 rounded-t-md font-medium ${
              activeTab === "professional"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Professional Details
          </button>
        </div>

        {/* Content based on active tab */}
        <div>
          {!user && <p>Loading...</p>}
          {user && activeTab === "personal" && <PersonalDetails user={user} />}
          {user && activeTab === "education" && <EducationDetails user={user} />}
          {user && activeTab === "professional" && <ProfessionalDetails user={user} />}
        </div>
      </div>
    </div>
  );
}
