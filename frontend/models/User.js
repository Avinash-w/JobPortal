import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  confirmPassword: String,
  phone: String,
  experienceLevel: String,
  city: String,
  workStatus: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
