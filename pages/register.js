"use client";
import React, { useState } from "react";
import Link from 'next/link';

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    experienceLevel: "",
    workStatus: "",
  });

  const [error, setError] = useState("");  
  const [success, setSuccess] = useState(""); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); 
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setError("");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          experienceLevel: "",
          workStatus: "",
        });
      } else {
        setError(result.message || "Something went wrong");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error sending data to server");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 px-4 md:px-16 py-6">
      {/* Left Section */}
      <div className="p-5 flex flex-col justify-center">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center mt-10 gap-6">
          <div className="max-w-md text-center md:text-left">
            <p className="text-lg font-bold text-blue-900">Unlock career</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-900 leading-tight">
              Your job search ends here
            </h1>
            <p className="text-xl font-light text-slate-700 mt-5">
              Discover 20 lakh+ career opportunities
            </p>
          </div>
          <div
            className="w-full h-[264px] bg-no-repeat bg-contain bg-center"
            style={{
              backgroundImage: "url('/images/registionman.png')",
              filter: "drop-shadow(10px 0px 1px rgba(0,0,0,0.3))",
            }}
          ></div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-md w-full max-w-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-left text-blue-900 mb-6">
            Create your Job Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="example@email.com"
                required
              />
            </div>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Experience</label>
                <select
                  name="experienceLevel"
                  value={form.experienceLevel}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-1 bg-white"
                >
                  <option value="Fresher">Fresher</option>
                  <option value="Experienced">Experienced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Work Status</label>
              <select
                name="workStatus"
                value={form.workStatus}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mt-1 bg-white"
              >
                <option value="Looking for Job">Looking for Job</option>
                <option value="Open to Offers">Open to Offers</option>
                <option value="Not Looking">Not Looking</option>
                <option value="Currently Employed">Currently Employed</option>
              </select>
            </div>

            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-2">
            You have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
  Login Here
</Link>

          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
