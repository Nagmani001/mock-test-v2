import { Router } from "express";
import jwt from "jsonwebtoken";
import { signinSchema, signupAdminSchema } from "../types/zodTypes";
import prisma from "../prisma";
import { JWT_SECRET } from "../config/utils";


export const adminUserRouter = Router();

adminUserRouter.post("/signup", async (req, res) => {
  const parsedData = signupAdminSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      msg: "invalid data",
    });
    return;
  }

  if (parsedData.data.adminCreatePassword != JWT_SECRET) {
    res.status(403).json({
      msg: "invalid auth",
    });
    return;
  }

  const userExists = await prisma.admin.findFirst({
    where: {
      email: parsedData.data?.email
    }
  });

  if (userExists) {
    res.status(409).json({
      msg: "user aready exists"
    });
    return;
  }
  const createUser = await prisma.admin.create({
    data: {
      email: parsedData.data.email,
      name: parsedData.data.name,
      password: parsedData.data.password,
    }
  });
  const token = jwt.sign(createUser.id, JWT_SECRET);
  res.status(200).json({
    msg: "user created successfully",
    token,
  });
});

adminUserRouter.post("/signin", async (req, res) => {
  const parsedData = signinSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      msg: "invalid data",
    });
  }

  const checkCredentials = await prisma.admin.findFirst({
    where: {
      email: parsedData.data?.email,
      password: parsedData.data?.password,
    }
  });
  if (!checkCredentials) {
    res.status(401).json({
      msg: "invalid credentials"
    });
    return;
  }

  const token = jwt.sign(checkCredentials.id, JWT_SECRET);
  res.status(200).json({
    msg: "user created successfully",
    token,
  });
});
