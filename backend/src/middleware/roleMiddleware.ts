import { Request, Response, NextFunction } from "express";

export const requireRole = (role: string) => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export const requireAnyRole = (roles: string[]) => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
};