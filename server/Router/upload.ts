import express, { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import PdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PDF, { IPdf } from "../models/PDF";
import jwt from "jsonwebtoken";
import { connectDB } from "../util/db";

type JWTpayload = {
  email: string;
};

const router = express();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/upload", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!req.files || !req.files.pdf) {
      res.status(404).json({ message: "Pdf file is required" });
      return;
    }

    const pdf = req.files.pdf as UploadedFile;

    const pdfData = await PdfParse(pdf.data);

    const prompt = `
        You are an expert HR. Analyze the resume and 

        1. Point out the strenghts
        2. Weakness
        3. Give point out of 100
        4. Suggest tips to improve

        Resume: 
        ${pdfData.text}
    `;

    const result = await model.generateContent(prompt);

    if (!result) {
      res.status(400).json({ message: "Can't generate results now" });
      return;
    }

    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTpayload;

    const email = decode.email;

    await connectDB();

    const Pdf = await PDF.create<IPdf>({
      email,
      fileName: pdf.name.replace(".pdf", ""),
      text: result.response.text(),
    });

    await Pdf.save();

    res.status(200).json({ analysis: result.response.text() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
