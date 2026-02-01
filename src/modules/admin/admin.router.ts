import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/users", AdminController.getAllUsers);

router.patch("/users/:id/toggle-status", AdminController.toggleUserStatus);

export const AdminRoutes = router;