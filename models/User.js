import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    middleName: String,
    lastName: String,
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
    dob: String,
  gender: String,
  languages: String,
  education: {
    class10: { board: String, school: String, year: String, percent: String },
    class12: { board: String, school: String, year: String, percent: String },
    diploma: { college: String, year: String, percent: String, stream: String },
    graduation: { college: String, year: String, percent: String, stream: String },
  },
  professional: {
    expYears: Number,
    expMonths: Number,
    salarySlip: String,
    experienceLetter: String,
    joiningLetter: String,
    currentSalary: Number,
    expectedSalary: Number,
  },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
