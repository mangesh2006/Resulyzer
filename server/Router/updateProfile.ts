import express, { Request, Response } from "express";
import { connectDB } from "../util/db";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const router = express.Router();

type JWTpayload = {
  email: string;
};

router.put("/updateProfile", async (req: Request, res: Response) => {
  try {
    const { Fullname, Username } = req.body;
    const token = req.cookies.token;

    if (!Fullname || !Username) {
      res.status(404).json({ message: "Data not found" });
      return;
    }

    if (!token) {
      res.status(404).json({ message: "Unauthorize access" });
      return;
    }

    await connectDB();

    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTpayload;

    const email = decode.email;

    const user = await User.findOneAndUpdate<IUser>(
      { email },
      { $set: { fullname: Fullname, username: Username } }
    );

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
