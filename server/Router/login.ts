import express, { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "../util/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({ message: "Email and password is required" });
      return;
    }

    await connectDB();

    const user = await User.findOne<IUser>({ email });

    if (!user) {
      res.status(403).json({ message: "Email does not exist" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(403).json({ message: "Password do not match" });
      return;
    }

    if (!user.isVerified) {
      res.status(401).json({ message: "Email not verified" });
      return;
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
