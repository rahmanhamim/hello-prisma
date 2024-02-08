import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { PostService } from "./post.service";

const prisma = new PrismaClient();

const insertIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await PostService.insertIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  const options = req.query;

  try {
    const result = await PostService.getAllPosts(options);

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const PostController = {
  insertIntoDB,
  getAllPosts,
};
