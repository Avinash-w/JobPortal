import React, { useState, useEffect } from "react";

export default function EducationDetails({ user }) {
  const [formData, setFormData] = useState({
    tenthBoard: "",
    tenthSchool: "",
    tenthYear: "",
    tenthPercent: "",

    twelfthBoard: "",
    twelfthSchool: "",
    twelfthYear: "",
    twelfthPercent: "",

    diplomaBoard: "",
    diplomaCollege: "",
    diplomaYear: "",
    diplomaPercent: "",
    diplomaStream: "",

    gradBoard: "",
    gradCollege: "",
    gradYear: "",
    gradPercent: "",
    gradStream: "",

    otherCertifications: "",
    certificateFile: null,
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch(`/api/user/${user._id}`);
        const data = await res.json();

        if (res.ok && data?.user?.education) {
          const edu = data.user.education;
          setFormData((prev) => ({
            ...prev,
            ...edu,
            certificateFile: null,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch education details", err);
      }
    };

    if (user?._id) {
      fetchEducation();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const formDataToSend = { ...formData };
      if (formDataToSend.certificateFile) {
        formDataToSend.certificateFile = null;
      }

      const res = await fetch(`/api/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ education: formDataToSend }),
      });

      await res.json(); // ✅ fixed: no unused variable

      if (res.ok) {
        alert("Education details saved!");
      } else {
        alert("Failed to save.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Error occurred.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-black-700 mb-4">Education Details</h2>

      <Section title="10th Class">
        <Input name="tenthBoard" label="Board" value={formData.tenthBoard} onChange={handleChange} />
        <Input name="tenthSchool" label="School Name" value={formData.tenthSchool} onChange={handleChange} />
        <Input name="tenthYear" label="Passing Year" type="number" value={formData.tenthYear} onChange={handleChange} />
        <Input name="tenthPercent" label="Percentage/CGPA" value={formData.tenthPercent} onChange={handleChange} />
      </Section>

      <Section title="12th Class">
        <Input name="twelfthBoard" label="Board" value={formData.twelfthBoard} onChange={handleChange} />
        <Input name="twelfthSchool" label="School Name" value={formData.twelfthSchool} onChange={handleChange} />
        <Input name="twelfthYear" label="Passing Year" type="number" value={formData.twelfthYear} onChange={handleChange} />
        <Input name="twelfthPercent" label="Percentage/CGPA" value={formData.twelfthPercent} onChange={handleChange} />
      </Section>

      <Section title="Diploma">
        <Input name="diplomaBoard" label="Board/University" value={formData.diplomaBoard} onChange={handleChange} />
        <Input name="diplomaCollege" label="College Name" value={formData.diplomaCollege} onChange={handleChange} />
        <Input name="diplomaYear" label="Passing Year" type="number" value={formData.diplomaYear} onChange={handleChange} />
        <Input name="diplomaPercent" label="Percentage/CGPA" value={formData.diplomaPercent} onChange={handleChange} />
        <Input name="diplomaStream" label="Stream" value={formData.diplomaStream} onChange={handleChange} />
      </Section>

      <Section title="Graduation">
        <Input name="gradBoard" label="Board/University" value={formData.gradBoard} onChange={handleChange} />
        <Input name="gradCollege" label="College Name" value={formData.gradCollege} onChange={handleChange} />
        <Input name="gradYear" label="Passing Year" type="number" value={formData.gradYear} onChange={handleChange} />
        <Input name="gradPercent" label="Percentage/CGPA" value={formData.gradPercent} onChange={handleChange} />
        <Input name="gradStream" label="Stream" value={formData.gradStream} onChange={handleChange} />
      </Section>

      <Section title="Other Certifications">
        <Input
          name="otherCertifications"
          label="Certification Details"
          value={formData.otherCertifications}
          onChange={handleChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Certificate</label>
          <input
            type="file"
            name="certificateFile"
            onChange={handleChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
          />
        </div>
      </Section>

      <div className="mt-6 text-right">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
        >
          Save Details
        </button>
      </div>
    </div>
  );
}

// Reusable Components
const Section = ({ title, children }) => (
  <>
    <h3 className="text-lg font-semibold text-gray-700 mt-6">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">{children}</div>
  </>
);

const Input = ({ name, label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
      placeholder={`Enter ${label}`}
    />
  </div>
);
