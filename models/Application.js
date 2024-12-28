import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    expectedSalary: { type: Number },
    startDate: { type: Date },
    status: {
      type: String,
      enum: ["hired", "rejected", "completed", "on-hold", "in-progress", "applied"],
      default: "applied",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
