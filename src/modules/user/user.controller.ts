import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserService } from "./user.service";

const insertIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const insertOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertOrUpdateProfile(req.body);

    res.status(200).json({
      success: true,
      message: "Profile created/updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getSingleUser(Number(req.params.id));

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UserController = {
  insertIntoDB,
  insertOrUpdateProfile,
  getUsers,
  getSingleUser,
};
