import express, { Request, Response } from "express";
import { SendMail } from "../util/SendMail";

const router = express.Router();

router.post("/verify-email", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(404).json({ message: "Email not found" });
      return;
    }

    await SendMail(email);

    res.status(200).json({ message: "Otp sent on your email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
