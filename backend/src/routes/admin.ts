import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { createTestSchema } from "../types/zodTypes";


export const adminRouter = Router();

adminRouter.get("/info", async (req: Request, res: Response) => {
  try {
    const totalSubmissions = await prisma.testAnswer.count();
    const testCount = await prisma.test.count();
    const activeUsers = await prisma.user.count();
    res.json({
      totalSubmissions,
      testCount,
      activeUsers,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(403).json({
      msg: "failed to fetch data",
    });
  }
});

adminRouter.post("/create-test", async (req: Request, res: Response) => {
  console.log(req.body);
  const parsedData = createTestSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      msg: "invalid data"
    });
    return;
  }
  try {
    await prisma.test.create({
      data: {
        title: parsedData.data.title,
        totalQuestions: parsedData.data.totalQuestions,
        totalTimeHour: parsedData.data.totalTimeHour,
        totalTimeMinute: parsedData.data.totalTimeMinute,
        totalTimeSecond: parsedData.data.totalTimeSecond,
        sectionId: parsedData.data.sectionId,
        question: {
          create: parsedData.data.questions.map(question => ({
            question: question.question,
            type: question.type,
            words: question.words,
            successMarks: question.successMarks,
            failureMarks: question.failureMarks,
            totalMarks: question.totalMarks,
            title: question.title,
            subQuestions: question.subQuestions ? {
              create: question.subQuestions.map(subQ => ({
                question: subQ.question
              }))
            } : undefined
          }))
        }
      }
    });
    res.status(200).json({
      msg: "test created successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "something went wrong, invalid data "
    })
  }
});
