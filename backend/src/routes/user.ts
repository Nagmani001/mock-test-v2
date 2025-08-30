import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { JWT_SECRET } from "../config/utils";
import { signinSchema, signupSchema } from "../types/zodTypes";

export const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
  const parsedData = signupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      msg: "invalid data",
    });
    return;
  }
  const userExists = await prisma.user.findFirst({
    where: {
      email: parsedData.data?.email
    }
  });

  if (userExists) {
    res.json({
      msg: "user aready exists"
    });
    return;
  }
  const createUser = await prisma.user.create({
    data: {
      email: parsedData.data.email,
      name: parsedData.data.name,
      password: parsedData.data.password,
    }
  });
  const token = jwt.sign(createUser.id, JWT_SECRET);
  res.json({
    msg: "user created successfully",
    token,
  });
});
userRouter.post("/signin", async (req: Request, res: Response) => {
  const parsedData = signinSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      msg: "invalid data",
    });
  }

  const checkCredentials = await prisma.user.findFirst({
    where: {
      email: parsedData.data?.email,
      password: parsedData.data?.password,
    }
  });
  if (!checkCredentials) {
    res.json({
      msg: "invalid credentials"
    });
    return;
  }

  const token = jwt.sign(checkCredentials.id, JWT_SECRET);
  res.json({
    msg: "user created successfully",
    token,
  });
});
