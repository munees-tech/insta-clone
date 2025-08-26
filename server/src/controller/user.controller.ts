import { Request, Response } from "express";
import User from "../models/user.model";
import { Sequelize } from "sequelize";
import cloudinary from "../lib/clodinary";

interface AuthRequest extends Request {
  user?: any;
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userName } = req.params;
    const user = (await User.findOne({ where: { userName } })) as any;
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(`Error in getUser Controller ${error}`);
    res.status(500).json({ message: "server error" });
  }
};

export const follow = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user?.id;
    if (userId === currentUserId) {
      return res.status(400).json({ message: "Don't follow yourself" });
    }

    const user = (await User.findByPk(userId)) as any;
    const currentUser = (await User.findByPk(currentUserId)) as any;

    const currentFollowing = currentUser.following || [];

    if (currentFollowing.includes(Number(userId))) {
      return res.status(400).json({ message: "Already user followed" });
    }
    currentFollowing.push(userId);

    const userFollow = user?.followers || [];
    userFollow.push(currentUserId);

    await currentUser.update({ following: currentFollowing });
    await user.update({ followers: userFollow });

    return res.status(200).json({ message: "Followed succesfully" });
  } catch (error) {
    console.log(`Error in follow Controller ${error}`);
    res.status(500).json({ message: "server error" });
  }
};

export const unFollow = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, targetId } = req.body;
    if (userId === targetId) {
      res.status(403).json({ message: "You can't unfollow yourself" });
    }
    const user = (await User.findByPk(userId)) as any;
    const targetUser = (await User.findByPk(targetId)) as any;
    if (!user || !targetUser) {
      res.status(404).json({ message: "user not found !" });
    }
    const updateFollowing = await user.following.filter((id: string) => {
      id !== targetId;
    });
    const updateFollowers = await user.followers.filter((id: string) => {
      id !== userId;
    });
    await user.update({ following: updateFollowing });
    await targetUser.update({ followers: updateFollowers });
    return res.status(200).json({ message: "unFollowed succesfully" });
  } catch (error) {
    console.log(`Error in unFollow Controller ${error}`);
    res.status(500).json({ message: "server error" });
  }
};

export const suggestUser = async (req: AuthRequest, res: Response) => {
  try {
    const suggestedUser = await User.findAll({
      order: [Sequelize.literal("Rand()")],
      limit: 5,
    });
    res.status(200).json(suggestedUser);
  } catch (error) {
    console.log(`Error in suggestedUser Controller ${error}`);
    res.status(500).json({ message: "server error" });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = (await User.findOne({ where: { id: userId } })) as any;
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    let img = user.img;
    const bio = req.body?.bio || "";

    if (req.file) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(req.file.path);
        img = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res
          .status(500)
          .json({ message: "Failed to upload image to Cloudinary" });
      }
    }

    const updatedUser = await user.update({ img, bio });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
