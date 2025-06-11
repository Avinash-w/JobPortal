import Image from "next/image";

export default function Organisation() {
  return (
       <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-white overflow-hidden relative">
      
      {/* LEFT CONTENT */}
      <div className="md:w-1/2 text-center md:text-left z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          We Help You Connect With <br />
          <span className="text-gray-700">The Organisation</span>
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto md:mx-0 mb-6">
          Upload your resume and discover real, verified job opportunities. Get started with a transparent platform made for students and early-career professionals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => router.push('/get-started')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push('/upload-resume')}
            className="border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-2 px-6 rounded-full transition duration-300"
          >
            Upload Resume
          </button>
        </div>
      </div>

      {/* RIGHT ILLUSTRATION */}
      <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
        <Image
          src="/images/registionman.png" // 🔁 Replace with your own image path in public/
          alt="Job Portal Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* BACKGROUND BLOBS (optional) */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </section>
  );
}