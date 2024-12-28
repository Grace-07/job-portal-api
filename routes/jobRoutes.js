import express from "express";
import Job from "../models/Job.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const job = new Job(req.body);

    await job.save();

    return res
      .status(200)
      .send({ message: "Job successfully created", job: job });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("companyId");
    res.json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const job = await Job.findOne({
      _id: id,
    }).populate("companyId");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching hotel" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedJob = req.body;

    const job = await Job.findOneAndUpdate(
      {
        _id: id,
      },
      updatedJob,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res
      .status(200)
      .send({ message: "Job details updated successfully", job: job });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
