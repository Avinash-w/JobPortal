"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobSearchBar() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/jobs?title=${title}&location=${location}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mt-10 w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center"
    >
      <input
        type="text"
        placeholder="Job title or keywords"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold w-full sm:w-auto"
      >
        Search Jobs
      </button>
    </form>
  );
}
