import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState("email");

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left: Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-blue-100 via-white to-blue-100 items-center justify-center p-8">
          <Image
            src="/images/jobs.png" // Change this to your actual image path
            alt="Login Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-left text-blue-900 mb-6">
            Login to Your Account
          </h2>

          {/* Toggle Buttons */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-200 p-1 rounded-full flex space-x-1 shadow-inner">
              <button
                onClick={() => setLoginMethod("email")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  loginMethod === "email"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700"
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setLoginMethod("mobile")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  loginMethod === "mobile"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700"
                }`}
              >
                Mobile
              </button>
            </div>
          </div>

          {/* Email Login Form */}
          {loginMethod === "email" && (
            <form className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Login with Email
              </button>
            </form>
          )}

          {/* Mobile Login Form */}
          {loginMethod === "mobile" && (
            <form className="space-y-4 mb-6">
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
              >
                Login with Mobile
              </button>
            </form>
          )}

          <div className="text-center text-gray-500 mb-4">OR</div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              {/* Google SVG */}
              <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.24...z" />
                <path fill="#34A853" d="M24 46c5.13...z" />
                <path fill="#4A90E2" d="M47.5 24c0...z" />
                <path fill="#FBBC05" d="M11.63 28.16...z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Login with Google</span>
            </button>

            <button
              onClick={() => signIn("linkedin")}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
            >
              {/* LinkedIn SVG */}
              <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                <path d="M19 0h-14C2.24 0 0 2.24...z" />
              </svg>
              <span className="text-sm font-medium">Login with LinkedIn</span>
            </button>
          </div>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
