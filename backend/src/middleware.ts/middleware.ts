
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/utils";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    res.status(403).json({
      msg: "invalid auth"
    });
    return;
  }
  try {
    const verifyToken = jwt.verify(token, JWT_SECRET);
    //@ts-ignore
    req.userId = verifyToken;
    next();
  } catch (err) {
    res.status(403).json({
      msg: "invalid auth"
    });
    return;
  }
}
