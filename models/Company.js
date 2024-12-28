import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    address: { type: Object },
    industry: { type: String },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
