import express, { Request, Response } from "express";
import { Verifyjwt } from "../middleware/Verifytoken";
import User from "../models/User";
import { connectDB } from "../util/db";

const router = express.Router();

router.get("/dashboard", Verifyjwt, async (req: Request, res: Response) => {
  try {
    const email = req.user?.email;

    if (!email) {
      res.status(404).json({ message: "Email not found" });
      return;
    }

    await connectDB()

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Login successfull", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
