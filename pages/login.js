"use client";
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = loginMethod === "email" ? { email, password } : { phone, password };

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-blue-100 via-white to-blue-100 items-center justify-center p-8">
          <Image
            src="/images/jobs.png"
            alt="Login Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-left text-blue-900 mb-6">
            Login to Your Account
          </h2>

          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-200 p-1 rounded-full flex space-x-1 shadow-inner">
              <button
                onClick={() => setLoginMethod("email")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  loginMethod === "email" ? "bg-blue-600 text-white shadow-md" : "text-gray-700"
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setLoginMethod("mobile")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  loginMethod === "mobile" ? "bg-blue-600 text-white shadow-md" : "text-gray-700"
                }`}
              >
                Mobile
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            {loginMethod === "email" ? (
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            ) : (
              <input
                type="text"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            )}
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{' '}
          <Link href="/register/">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}