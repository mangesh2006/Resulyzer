import express, { Express } from "express";
import cors from "cors";
import signup from "./Router/signup";
import login from "./Router/login";
import verify from "./Router/verify";
import dashboard from "./Router/dashboard";
import upload from "./Router/upload";
import logout from "./Router/logout";
import pdf from "./Router/pdf";
import fetchPdf from "./Router/Fetchpdf";
import deleteProfile from "./Router/delete";
import resend from "./Router/resend-otp";
import reset from "./Router/reset";
import verifyEmail from "./Router/verify-email";
import updateProfile from './Router/updateProfile'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
const app: Express = express();

app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://resulyzer.vercel.app", "http://localhost:11434"],
    credentials: true,
  })
);
app.use("/api", signup);
app.use("/api", login);
app.use("/api", verify);
app.use("/api", dashboard);
app.use("/api", upload);
app.use("/api", logout);
app.use("/api", pdf);
app.use("/api", fetchPdf);
app.use("/api", deleteProfile);
app.use("/api", resend);
app.use("/api", reset);
app.use("/api", verifyEmail);
app.use("/api", updateProfile)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
