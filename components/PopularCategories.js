'use client';
import { Briefcase, Megaphone, PenTool, Headphones } from 'lucide-react';

const categories = [
  {
    icon: <Briefcase size={28} />,
    title: 'Development & IT',
    jobs: '15 jobs',
    description: 'Frontend, backend, web and app developer jobs.',
  },
  {
    icon: <Megaphone size={28} />,
    title: 'Marketing & Sales',
    jobs: '8 jobs',
    description: 'Advertising, digital marketing, and brand growth roles.',
  },
  {
    icon: <PenTool size={28} />,
    title: 'Design & Creative',
    jobs: '12 jobs',
    description: 'UI/UX, graphic, and product design jobs.',
  },
  {
    icon: <Headphones size={28} />,
    title: 'Customer Service',
    jobs: '9 jobs',
    description: 'Customer experience and support roles.',
  },
];

export default function PopularCategories() {
  return (
    <section className="px-6 md:px-16 py-16 bg-gray-50">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Popular Categories
          </h2>
          <p className="text-gray-500 mt-1">
            2000+ jobs live — 210 added today.
          </p>
        </div>
        <button className="mt-4 md:mt-0 text-green-600 font-semibold hover:underline">
          View all categories
        </button>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm p-6 border hover:shadow-md transition"
          >
            <div className="text-green-600 mb-4">{cat.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{cat.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{cat.jobs}</p>
            <p className="text-sm text-gray-600">{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
