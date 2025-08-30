import { Router, Request, Response } from "express";
import prisma from "../prisma";

export const submissionRouter = Router();

interface Submission {
  id: string,
  userName: string,
  testTitle: string,
  submittedAt: string,
  score?: number,
  status?: string,
  totalQuestions: number,
  timeSpent: string
}

submissionRouter.get("/getAll", async (req: Request, res: Response) => {
  const findSubmissionl = await prisma.testAnswer.findMany({
    include: {
      solution: true
    }
  });

  const data = Promise.all(
    findSubmissionl.map(async (x: any) => {
      const userDetails = await prisma.user.findFirst({
        where: {
          id: x.userId
        }
      });
      const testDetails = await prisma.test.findFirst({
        where: {
          id: x.testId
        }
      });

      if (!userDetails?.name || !testDetails) {
        res.json({
          msg: "request failed"
        })
        return;
      }

      const newSub: Submission = {
        id: x.id,
        userName: userDetails.name,
        submittedAt: x.submittedAt,
        timeSpent: x.timeSpent,
        testTitle: testDetails.title,
        totalQuestions: testDetails.totalQuestions,
        score: x.percentage,
        status: x.status
      };
      return newSub;
    }));
  const resolvedData = await data;

  res.json({
    msg: resolvedData
  })
});



submissionRouter.get("/getOne/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const testAnswer = await prisma.testAnswer.findFirst({
    where: {
      id,
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
    res.json({
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




