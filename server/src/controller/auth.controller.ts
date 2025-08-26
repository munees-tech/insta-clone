import bcrypt from "bcrypt";
import User from "../models/user.model";
import { Request, Response } from "express";
import gendrateToken from "../utils/gendrateToken";

interface Iuser {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface AuthRequest extends Request {
  user?: any;
}

export const signup = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body as {
    userName: string;
    email: string;
    password: string;
  };
  try {
    const existingUser = (await User.findOne({
      where: { email },
    })) as Iuser | null;
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }
    const hassedPassword = await bcrypt.hash(password, 10);
    const newUser = (await User.create({
      userName,
      email,
      password: hassedPassword,
    })) as unknown as Iuser;

    await gendrateToken(newUser.id, res);
    return res.status(200).json({
      message: "user created succesfully",
      user: { id: newUser.id, userName, email },
    });
  } catch (error) {
    console.log(`Error in signup controller ${error}`);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };
    const user = (await User.findOne({ where: { email } })) as any;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password doesn't matched" });
    }
    await gendrateToken(user?.id, res);

    res.status(200).json({
      id: user?.id,
      name: user?.name,
      email: user?.email,
    });
  } catch (error) {
    console.log(`Error in login Controller ${error}`);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout succesfully" });
  } catch (error) {
    console.log(`Error in logout Controller ${error}`);
    res.status(500).json({ message: "server error" });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = (await User.findOne({
      where: { id: req.user?.id },
      attributes: { exclude: ["password"] },
    })) as any | null;
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error in getMe controller ${error}`);
    res.status(500).json({ message: "server error" });
  }
};
