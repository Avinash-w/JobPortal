import { useState, useEffect } from "react";

export default function ProfessionalDetails({ user }) {
  const [formData, setFormData] = useState({
    experienceYears: "",
    experienceMonths: "",
    salarySlip: null,
    experienceLetter: null,
    joiningLetter: null,
    currentSalary: "",
    expectedSalary: "",
  });

  // Optional: Fetch existing professional data on mount
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/user/${user._id}`);
        const result = await res.json();

        if (res.ok && result.user?.professional) {
          setFormData((prev) => ({
            ...prev,
            ...result.user.professional,
            salarySlip: null,
            experienceLetter: null,
            joiningLetter: null,
          }));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (user?._id) {
      fetchDetails();
    }
  }, [user]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Exclude file fields from JSON body
      const jsonData = { ...formData };
      delete jsonData.salarySlip;
      delete jsonData.experienceLetter;
      delete jsonData.joiningLetter;

      const res = await fetch(`/api/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ professional: jsonData }),
      });

      await res.json(); // remove unused variable warning

      if (res.ok) {
        alert("Professional details updated successfully!");
      } else {
        alert("Failed to update details.");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Error occurred while saving details.");
    }
  };

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold text-blue-700">Professional Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="experienceYears"
          placeholder="Experience (Years)"
          value={formData.experienceYears}
          className="input-style"
          onChange={handleChange}
        />
        <input
          type="number"
          name="experienceMonths"
          placeholder="Experience (Months)"
          value={formData.experienceMonths}
          className="input-style"
          onChange={handleChange}
        />
      </div>

      <label className="block">
        <span className="block mb-1 font-medium">Upload Salary Slip</span>
        <input
          type="file"
          name="salarySlip"
          className="input-style"
          onChange={handleFileChange}
        />
      </label>

      <label className="block">
        <span className="block mb-1 font-medium">Upload Experience Letter</span>
        <input
          type="file"
          name="experienceLetter"
          className="input-style"
          onChange={handleFileChange}
        />
      </label>

      <label className="block">
        <span className="block mb-1 font-medium">Upload Joining Letter</span>
        <input
          type="file"
          name="joiningLetter"
          className="input-style"
          onChange={handleFileChange}
        />
      </label>

      <input
        type="number"
        name="currentSalary"
        placeholder="Current Salary (per month)"
        value={formData.currentSalary}
        className="input-style"
        onChange={handleChange}
      />
      <input
        type="number"
        name="expectedSalary"
        placeholder="Expected Salary (per month)"
        value={formData.expectedSalary}
        className="input-style"
        onChange={handleChange}
      />

      <div className="text-right mt-6">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
        >
          Save Details
        </button>
      </div>
    </form>
  );
}
