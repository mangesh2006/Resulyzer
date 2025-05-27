import express, { Request, Response } from "express";
import { connectDB } from "../util/db";
import User, { IUser } from "../models/User";
import { SendMail } from "../util/SendMail";

const router = express.Router();

type Credentials = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { fullname, username, email, password }: Credentials = req.body;

    if (!fullname || !username || !email || !password) {
      res.status(404).json({ message: "Credentials not found" });
      return;
    }

    await connectDB();

    const existing = await User.findOne<IUser>({ email });

    if (existing) {
      if (!existing.isVerified) {
        res.status(401).json("User not verified");
        return;
      }
      res.status(403).json({ message: "User already exist" });
      return;
    }

    const user = await User.create({
      username,
      password,
      email,
      fullname,
    });

    await user.save();
    await SendMail(email);

    res
      .status(200)
      .json({ message: `An otp sent to your email for verification` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
    return;
  }
});

export default router;
