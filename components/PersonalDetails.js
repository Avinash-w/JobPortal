import { useState, useEffect } from "react";
import Image from "next/image";

export default function PersonalDetails({ user, setUser }) {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    languages: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("/default-profile.png");

  useEffect(() => {
    if (user) {
      const nameParts = user?.name?.split(" ") || [];

      setFormData({
        firstName: user?.firstName || nameParts[0] || "",
        middleName: user?.middleName || "",
        lastName:
          user?.lastName ||
          (nameParts.length > 2
            ? nameParts.slice(2).join(" ")
            : nameParts[1] || ""),
        dob: user?.dob || "",
        gender: user?.gender || "",
        email: user?.email || "",
        mobile: user?.mobile || user?.phone || "",
        languages: user?.languages || "",
      });

      setPreviewImage(user?.profileImage || "/default-profile.png");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    setUploading(true);
    const formDataImg = new FormData();
    formDataImg.append("file", selectedFile);
    formDataImg.append("userId", user._id);

    try {
      const res = await fetch("/api/uploadProfileImage", {
        method: "POST",
        body: formDataImg,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile image uploaded!");
        setPreviewImage(data.user.profileImage);
        if (setUser) setUser(data.user); // update parent state or context
      } else {
        console.error("Upload failed:", data.message || data);
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const fullName =
        `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();

      const res = await fetch(`/api/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personal: {
            ...formData,
            name: fullName,
            phone: formData.mobile,
          },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Details updated successfully!");
        if (setUser) {
          const refreshedRes = await fetch(`/api/user/${user._id}`);
          const refreshedUser = await refreshedRes.json();
          setUser(refreshedUser.user);
        }
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Personal Details
      </h2>

      <div className="mb-6 flex flex-col items-center">
        <Image
          src={previewImage}
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full border-4 border-indigo-200 shadow-lg object-cover"
          unoptimized // <-- required for previewImage (blob/base64)
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "First Name", name: "firstName" },
          { label: "Middle Name", name: "middleName" },
          { label: "Last Name", name: "lastName" },
          { label: "Date of Birth", name: "dob", type: "date" },
          {
            label: "Gender",
            name: "gender",
            type: "select",
            options: ["", "male", "female", "other"],
          },
          { label: "Languages Known", name: "languages" },
          { label: "Email", name: "email", disabled: true },
          { label: "Mobile Number", name: "mobile" },
        ].map(
          ({ label, name, type = "text", options = [], disabled = false }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              {type === "select" ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt
                        ? opt.charAt(0).toUpperCase() + opt.slice(1)
                        : "Select Gender"}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  disabled={disabled}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter ${label}`}
                />
              )}
            </div>
          )
        )}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Profile Image
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
        >
          Save Details
        </button>
      </div>
    </div>
  );
}
