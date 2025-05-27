import express, { Request, Response } from "express";

const router = express.Router();

router.post("/logout", async (req: Request,res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
