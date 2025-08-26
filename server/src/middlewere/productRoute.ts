import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
  user?:any
}

export const productRoute = async (req:AuthRequest, res:Response, next:NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECREATE!) as jwt.JwtPayload;
    if (!decode) {
      return res.status(400).json({ message: "Token unAutharized" });
    }
    const user = await User.findOne({
      where: { id: decode.id},
      attributes: { exclude: ["password"] },
    }) as any | null;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in product route ${error}`);
    res.status(500).json({ message: "server error" });
  }
};
