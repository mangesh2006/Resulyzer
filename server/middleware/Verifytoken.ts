import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JWTpayload {
  email: string;
}

export const Verifyjwt = (req: Request, res: Response, next: NextFunction) => {
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

    req.user = { email: decode.email };

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
