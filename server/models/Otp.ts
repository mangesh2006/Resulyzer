import { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IOtp {
  otp: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OtpSchema = new Schema<IOtp>(
  {
    otp: { type: String, required: true, expires: 5 * 60 * 1000 },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

OtpSchema.pre("save", async function (next) {
  if (this.isModified("otp")) {
    this.otp = await bcrypt.hash(this.otp, 10);
  }

  next();
});

const Otp = models?.Otp || model("Otp", OtpSchema);

export default Otp;
