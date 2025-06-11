import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    profileImage: String,
    password: {
      type: String,
      required: true,
    },
    experienceLevel: String,
    city: String,
    workStatus: String,
    // You can add more fields later like alternateNumber, profileImage, etc.
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
