import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from '../lib/auth';

// ১. Apnar project-er role gulo ekhane define kora holo
export enum UserRole {
    STUDENT = "STUDENT",
    TUTOR = "TUTOR",
    ADMIN = "ADMIN"
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
                emailVerified: boolean;
            }
        }
    }
}

const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // ২. Better-Auth session check (Express headers pass kora hoyeche)
            const session = await betterAuth.api.getSession({
                headers: req.headers as any
            });

            // ৩. Login na thakle 401 Unauthorized error
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized! Please login first."
                });
            }

            // ৪. User object request-e set kora jate controller-e use kora jay
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role as string,
                emailVerified: session.user.emailVerified
            };

            // ৫. Role checking logic (STUDENT, TUTOR, ba ADMIN)
            if (roles.length && !roles.includes(req.user.role as UserRole)) {
                return res.status(403).json({
                    success: false,
                    message: `Forbidden! You need ${roles.join(" or ")} role to access this.`
                });
            }

            next();
        } catch (err) {
            next(err); // Error handler-e pathano
        }
    };
};

export default auth;