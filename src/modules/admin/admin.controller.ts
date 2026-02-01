import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};



const toggleUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminService.toggleUserStatusInDB(id);
    res.status(200).json({
      success: true,
      message: "User status updated",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const AdminController = {
  getAllUsers,
  toggleUserStatus,
};