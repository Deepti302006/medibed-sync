import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET in .env");
  process.exit(1);
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as Record<string, any>;
    // Attach user info to request
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
