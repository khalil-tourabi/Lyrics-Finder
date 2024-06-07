import { Request, Response, NextFunction } from "express";
import { UnAuthenticatedError } from "../errors/index.js";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.isAdmin) {
    throw new UnAuthenticatedError("Not authorized as an admin");
  }
  next();
};

export default isAdmin;