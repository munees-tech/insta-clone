import { Request, Response } from "express";
import User from "../models/user.model";
import Post from "../models/post.model";
import cloudinary from "../lib/clodinary";

interface AuthRequest extends Request {
  user?: any;
}

export const addPost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { description } = req.body as {
      description: string;
    };
    let { img } = req.body as {
      img?: string;
    };

    if (img) {
      const uploaderResponse = await cloudinary.uploader.upload(img);
      img = uploaderResponse.secure_url;
    }

    const userId = req.user?.id;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    const newPost = await Post.create({
      userId,
      description,
      img,
    });

    res.status(200).json({ newPost });
  } catch (error) {
    console.log(`Error in addPost Controller ${error}`);
    res.status(500).json({ message: "server error" });
  }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await Post.destroy({ where: { id: postId } });
    return res.status(200).json({ message: "Deleted Succesfully" });
  } catch (error) {
    console.log(`Error in likeUnlike Controller ${error}`);
    res.status(500).json({ message: "server error" });
  }
};

export const likeUnlikePost = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const postId = req.params.id;
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      res.status(404).json({ message: "post not found" });
    }
    let like = post?.get("like") as any[];
    if (!Array.isArray(like)) {
      like = [];
    }
    const userLikePost = like.includes(userId);
    if (userLikePost) {
      like = like.filter((id) => id !== userId);
      await Post.update({ like }, { where: { id: postId } });
      return res.status(200).json({ message: "unliked succesfully" });
    } else {
      like.push(userId);
      await Post.update({ like }, { where: { id: postId } });
      return res.status(200).json({ message: "liked succesfully" });
    }
  } catch (error) {
    console.log(`Error in likeUnlike Controller ${error}`);
    res.status(500).json({ message: "server error" });
  }
};

export const getPost = async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.findAll({
      order: [["createdAt", "DESC"]],
      include: {
        model: User,
        as: "user",
        attributes: { exclude: ["password"] },
      },
    });

    res.status(200).json(post);
  } catch (error) {
    console.log(`Error in getPost Controller ${error}`);
    res.status(500).json({ message: "server error" });
  }
};

export const commentOnPost = async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body;
    const userId = req.user?.id;
    const postId = req.params.id;
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    let comments = (post.get("comment") as any[]) || [];
    if (!Array.isArray(comments)) {
      comments = [];
    }
    const comment = { user: userId, text } as any;
    comments.push(comment);
    await Post.update({ comment: comments }, { where: { id: postId } });
    res.status(200).json({ message: "comment added succesfully" });
  } catch (error) {
    console.log(`Error in commentOn Controller ${error}`);
    res.status(500).json({ message: "server error" });
  }
};
