import Image from "next/image";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
          How It Works
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Student Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/images/jobs.png" // Replace with your own icon
                alt="Student"
                width={40}
                height={40}
              />
              <h3 className="text-2xl font-semibold text-blue-600">
                For Students
              </h3>
            </div>
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-start gap-3">
                <Image src="/images/jobs.png" alt="Step 1" width={28} height={28} />
                <span>Sign up and create your student profile</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/jobs.png" alt="Step 2" width={28} height={28} />
                <span>Upload your resume and add preferences</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/jobs.png" alt="Step 3" width={28} height={28} />
                <span>Get matched and apply to jobs easily</span>
              </li>
            </ul>
          </div>

          {/* Company Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/images/jobs.png" // Replace with your own icon
                alt="Company"
                width={40}
                height={40}
              />
              <h3 className="text-2xl font-semibold text-green-600">
                For Companies
              </h3>
            </div>
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-start gap-3">
                <Image src="/images/jobs.png" alt="Step 1" width={28} height={28} />
                <span>Register your company and complete your profile</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/jobs.png" alt="Step 2" width={28} height={28} />
                <span>Post detailed job listings easily</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/jobs.png" alt="Step 3" width={28} height={28} />
                <span>View candidate matches and hire quickly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
