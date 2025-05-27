import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import PDF, { IPdf } from "../models/PDF";

const router = express.Router();

type JWTpayload = {
  email: string;
};

router.delete("/delete", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(404).json({ message: "Token not found" });
      return;
    }

    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTpayload;

    const email = decode.email;

    await User.findOneAndDelete<IUser>({ email });

    await PDF.findOneAndDelete<IPdf>({ email });

    res.status(200).json({ message: "Profile deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
