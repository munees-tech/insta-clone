import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = async (userId:any, res:Response) => {
  try {
     const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    if (!token) {
      return res.status(400).json({ message: "unauthorized" });
    }
    res.cookie("jwt", token, {
      maxAge: 7 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
  } catch (error) {
    console.log(`Error in generateToken ${error}`);
  }
};

export default generateToken;
