import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import "dotenv/config";
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  trustedOrigins: [process.env.APP_URL || "http://localhost:3000"],
  
  baseURL: "http://localhost:5000/api/auth", 
  
  secret: process.env.BETTER_AUTH_SECRET!,
  user: {
    additionalFields: {
      role: { type: "string", required: true, defaultValue: "CUSTOMER" },
      phone: { type: "string", required: false },
      status: { type: "string", defaultValue: "ACTIVE" }
    }
  }
});