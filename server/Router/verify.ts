import express, { Request, Response } from "express";
import Otp, { IOtp } from "../models/Otp";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";
import dotenv from "dotenv";
import { connectDB } from "../util/db";

dotenv.config();
const router = express.Router();

router.post("/verify", async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(404).json({ message: "Email and otp is required" });
      return;
    }

    await connectDB();

    const user = await Otp.findOne<IOtp>({ email });

    if (!user) {
      res.status(403).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch) {
      res.status(403).json({ message: "Invalid or expired otp" });
      return;
    }

    await User.findOneAndUpdate<IUser>(
      { email },
      { $set: { isVerified: true } }
    );

    await Otp.deleteMany({ email });

    res.status(200).json({ message: "Email verified" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
