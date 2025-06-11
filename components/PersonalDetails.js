import { useState } from "react";

export default function PersonalDetails({ user }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", user._id); // passed from Dashboard

    try {
      const res = await fetch("/api/uploadProfileImage", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile image uploaded!");
        console.log("Updated user:", data.user);
        // Optionally trigger a refresh or update UI with new image
      } else {
        console.error("Upload failed:", data.error);
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Personal Details</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <div className="mt-4">
        <input type="file" onChange={handleImageChange} />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
}
