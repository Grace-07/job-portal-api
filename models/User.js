import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    emailAddress: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    about: { type: String },
    image: { type: Buffer },
    birthday: { type: Date, required: true },
    address: { type: Object, required: true },
    contactNumber: { type: String, required: true },
    workExperiences: [{ type: Object }],
    educationalBackground: [{ type: Object }],
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    type: {
      type: String,
      enum: ["employer", "applicant"],
      default: "applicant",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
