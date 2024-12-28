import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    position: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String },
    type: { type: String },
    function: { type: String },
    setup: { type: String },
    vacancy: { type: Number },
    salaryPay: { type: Number },
    payPeriod: { type: String },
    expirationDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
