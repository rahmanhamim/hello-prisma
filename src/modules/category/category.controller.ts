import { Category, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const prisma = new PrismaClient();

const insertIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.insertIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const CategoryController = {
  insertIntoDB,
};
