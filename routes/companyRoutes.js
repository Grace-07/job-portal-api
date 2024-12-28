import express from "express";
import Company from "../models/Company.js";
import verifyToken from "../middleware/auth.js";
import Application from "../models/Application.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    console.log("req.body", req.body);
    const company = new Company(req.body);

    console.log("company", company);

    await company.save();

    return res
      .status(200)
      .send({ message: "Company successfully created", company: company });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching companies" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const company = await Company.findOne({
      _id: id,
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching company" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCompany = req.body;

    const company = await Company.findOneAndUpdate(
      {
        _id: id,
      },
      updatedCompany,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.status(200).send({
      message: "Company details updated successfully",
      company: company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
