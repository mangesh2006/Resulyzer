import express, { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { connectDB } from "../util/db";

const router = express.Router();

router.put("/reset-password", async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      res.status(404).json({ message: "Credentials not found" });
      return;
    }

    await connectDB();

    const user = await User.findOneAndUpdate<IUser>(
      { email },
      { $set: { password } }
    );

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Password reset successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
