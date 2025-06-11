"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import HowItWorks from "../components/HowItWorks";
import Organisation from "../components/Organisation";
import PopularCategories from "../components/PopularCategories";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Background decorative blobs */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        {/* TEXT SECTION */}
        <motion.div
          className="max-w-xl text-center md:text-left z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4 leading-tight">
            Bridging Talent with{" "}
            <span className="text-green-600">Opportunity</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Upload your resume or post your job today – it’s fast and free!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/student-portal"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition"
            >
              🎓 I’m a Student
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/company-portal"
              className="px-6 py-3 bg-green-600 text-white rounded-full font-medium shadow-md hover:bg-green-700 transition"
            >
              🏢 I’m a Company
            </motion.a>
          </div>
        </motion.div>

        {/* IMAGE SECTION */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <Image
            src="/images/jobs.png"
            alt="Job Portal Illustration"
            width={500}
            height={400}
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <HowItWorks />
            <Organisation />
            <PopularCategories />

    </>
  );
}
