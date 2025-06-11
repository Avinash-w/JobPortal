import React from "react";

export default function EducationDetails() {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold text-blue-700">Education Details</h2>

      <input type="text" placeholder="Qualification (e.g. B.Tech, MBA)" className="input-style" />
      <input type="text" placeholder="Course (e.g. Computer Science)" className="input-style" />
      <input type="text" placeholder="Institute / College" className="input-style" />
      <input type="text" placeholder="Board / University" className="input-style" />
      <input type="number" placeholder="Passing Year" className="input-style" />
      <input type="text" placeholder="CGPA / Percentage" className="input-style" />
      
      <label className="block">
        <span className="block mb-1 font-medium">Upload Certificate</span>
        <input type="file" className="input-style" />
      </label>
    </form>
  );
}
