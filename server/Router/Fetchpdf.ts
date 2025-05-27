import express, { Request, Response } from "express";
import PDF, { IPdf } from "../models/PDF";
import { connectDB } from "../util/db";

const router = express.Router();

router.get("/Fetchpdf", async (req: Request, res: Response) => {
  try {
    const fileName = req.query.fileName as string;

    if (!fileName) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    await connectDB();

    const Restext = await PDF.findOne<IPdf>({ fileName });

    if (!Restext) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ text: Restext.text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
