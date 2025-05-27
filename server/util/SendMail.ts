import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateOtp } from "./GenerateOtp";
import fs from "fs";
import path from "path";
import Otp, { IOtp } from "../models/Otp";
import { connectDB } from "./db";
dotenv.config();

const Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const otp = generateOtp();

export async function SendMail(to: string) {
  const templatePath = path.join(process.cwd(), "/email/email.html");
  let emailTemplate = fs.readFileSync(templatePath, "utf-8");

  emailTemplate = emailTemplate.replace("{{code}}", otp);

  try {
    const info = await Transporter.sendMail({
      from: `"Resulyzer" <${process.env.USER}>`,
      to,
      subject: "Verify your email",
      html: emailTemplate,
    });

    await connectDB();

    const createOtp = await Otp.create<IOtp>({
      otp,
      email: to,
    });

    await createOtp.save();

    return { success: true, otp };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
