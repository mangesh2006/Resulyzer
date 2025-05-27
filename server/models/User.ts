import { model, models, Schema } from "mongoose";
import bcryptjs from "bcryptjs";

export interface IUser {
  username: string;
  password: string;
  email: string;
  fullname: string;
  isVerified?: boolean;
  createdAt?: Date;
  UpdatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (!update) return next();

  if (update && "password" in update) {
    update.password = await bcryptjs.hash(update.password, 10);
  } else if (
    update &&
    "$set" in update &&
    update.$set &&
    "password" in update.$set
  ) {
    update.$set.password = await bcryptjs.hash(update.$set.password, 10);
  }

  this.setUpdate(update);
  next();
});

const User = models?.User || model("User", UserSchema);

export default User;
