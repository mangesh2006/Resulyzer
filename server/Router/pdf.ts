import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import PDF, { IPdf } from "../models/PDF";
import { connectDB } from "../util/db";

const router = express.Router();

type JWTpayload = {
  email: string;
};

router.get("/pdf", async (req: Request, res: Response) => {
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

    await connectDB();

    const pdf = await PDF.find<IPdf>({ email });

    res.status(200).json({ pdf });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
