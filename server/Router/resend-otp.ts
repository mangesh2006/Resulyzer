import express, { Request, Response } from "express";
import Otp from "../models/Otp";
import { SendMail } from "../util/SendMail";
import { connectDB } from "../util/db";

const router = express.Router();

router.post("/resend-otp", async (req: Request, res: Response) => {
  try {
    const {email} = req.body;

    if (!email) {
      res.status(404).json({ message: "Email not found" });
      return;
    }

    await connectDB()

    await Otp.deleteMany({ email });

    await SendMail(email);

    res.status(200).json({ message: "Otp resent to your email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
