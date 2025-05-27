import { model, models, Schema } from "mongoose";

export interface IPdf {
  email: string;
  fileName: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PdfSchema = new Schema<IPdf>(
  {
    email: { type: String, required: true },
    fileName: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const PDF = models?.Pdf || model("Pdf", PdfSchema);

export default PDF;
