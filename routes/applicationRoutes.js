import express from "express";
import Application from "../models/Application.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    console.log("req.body", req.body);
    const application = new Application(req.body);

    await application.save();

    return res.status(200).send({
      message: "Apply job successfully created",
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("employeeId")
      .populate("jobId");

    res.json(applications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching applications" });
  }
});

export default router;
