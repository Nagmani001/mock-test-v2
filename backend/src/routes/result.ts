import prisma from "../prisma";
import { Router, Request, Response } from "express";
import {getAuth} from "@clerk/express";

export const resultRouter = Router();

resultRouter.get("/getProblemOne/:id", async (req: Request, res: Response) => {
  const {userId} = getAuth(req);
  const id = req.params.id;
  const testAnswerId = await prisma.testAnswer.findFirst({ where: { testId: id } });
  if (!testAnswerId || ! userId) {
    res.status(401).json({
      msg: "error occured"
    });
    return;
  }

  const testAnswer = await prisma.testAnswer.findFirst({
    where: {
      id: testAnswerId.id,
      userId,
    },
    include: {
      solution: true
    }
  });

  const userDetails = await prisma.user.findFirst({
    where: {
      id: testAnswer?.userId
    }
  });

  const testDetails = await prisma.test.findFirst({
    where: {
      id: testAnswer?.testId
    }
  });

  if (!testAnswer || !userDetails || !testDetails) {
    res.status(401).json({
      msg: "error occured"
    })
    return;
  }

  const solution = await Promise.all(testAnswer.solution.map(async (x) => {
    const questionDetails = await prisma.question.findFirst({ where: { id: x.questionId } });

    return {
      id: x.id,
      question: questionDetails?.question,
      type: questionDetails?.type,
      words: x.wordsNumber,
      successMarks: questionDetails?.totalMarks,
      failureMarks: questionDetails?.failureMarks,
      userAnswer: x.answer,
      adminRating: x.adminRating,
      adminFeedback: x.adminFeedBack
    }
  }));

  const toReturn = {
    id: testAnswer.id,
    userName: userDetails.name,
    userEmail: userDetails.email,
    testTitle: testDetails.title,
    submittedAt: testAnswer.submittedAt,
    totalScore: testAnswer.percentage,
    status: testAnswer.status,
    totalQuestions: testDetails.totalQuestions,
    timeSpent: testAnswer.timeSpent,
    questions: solution
  }
  console.log(toReturn);
  res.json({
    msg: toReturn
  })
});
