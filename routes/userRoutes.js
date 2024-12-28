import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth.js";
import Application from "../models/Application.js";

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { emailAddress } = req.body;

    console.log("req.body", req.body);

    let user = await User.findOne({
      emailAddress: emailAddress,
    });

    console.log("user", user);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body);
    console.log("user", user);
    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).send({ message: "User registered OK" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;

    const user = await User.findOneAndUpdate(
      {
        _id: id,
      },
      updatedUser,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .send({ message: "User details updated successfully", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({
      _id: id,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .send({ message: "User retrieved successfully", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/:id/applications", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;

    const applications = await Application.find({
      employeeId: id,
    }).populate({
      path: "jobId",
      populate: {
        path: "companyId", // Populate the 'user' in each comment
      },
    });

    if (!applications) {
      return res.status(404).json({ message: "Applications not found" });
    }

    res.json(applications);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
