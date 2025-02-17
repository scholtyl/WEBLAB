import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.user) {
    console.log("Admin middleware called before auth middleware!! Server setup issue!!");
    res.status(401).json({ message: "Unauthorized: Only for Admins" });
    return;
  }
  const user = res.locals.user;

  if (!user.isAdmin) {
    res.status(401).json({ message: "Unauthorized: Only for Admins" });
    return;
  }

  next();
};
