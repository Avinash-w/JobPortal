import React from "react";

export default function ProfessionalDetails() {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold text-blue-700">Professional Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <input type="number" placeholder="Experience (Years)" className="input-style" />
        <input type="number" placeholder="Experience (Months)" className="input-style" />
      </div>

      <label className="block">
        <span className="block mb-1 font-medium">Upload Salary Slip</span>
        <input type="file" className="input-style" />
      </label>

      <label className="block">
        <span className="block mb-1 font-medium">Upload Experience Letter</span>
        <input type="file" className="input-style" />
      </label>

      <label className="block">
        <span className="block mb-1 font-medium">Upload Joining Letter</span>
        <input type="file" className="input-style" />
      </label>

      <input type="number" placeholder="Current Salary (per month)" className="input-style" />
      <input type="number" placeholder="Expected Salary (per month)" className="input-style" />
    </form>
  );
}
