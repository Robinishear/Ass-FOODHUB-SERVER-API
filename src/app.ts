// src/app.ts
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { CardRoutes } from "./modules/card/card.router";
import { AdminRoutes } from "./modules/admin/admin.router";
import { auth } from "./lib/auth";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

app.use("/api/auth", toNodeHandler(auth)); 

app.use("/api/v1/cards", CardRoutes);
app.use("/api/v1/admin", AdminRoutes);

export default app;