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
      solution: true,
      subSolution: true
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

  // Get all questions for this test to handle both regular and comprehension questions
  const allQuestions = await prisma.question.findMany({
    where: { testId: testAnswer.testId },
    include: {
      subQuestions: true
    }
  });

  const solution = await Promise.all(allQuestions.map(async (questionDetails) => {
    if (questionDetails.type === 'COMPREHENSION') {
      // For comprehension questions, only show sub-questions (no main answer)
      let subQuestions: any[] = [];
      if (questionDetails.subQuestions) {
        subQuestions = await Promise.all(
          questionDetails.subQuestions.map(async (subQ) => {
            // Find the corresponding sub-solution for this sub-question
            const subSolution = testAnswer.subSolution.find(subSol => subSol.subQuestionId === subQ.id);
            
            return {
              id: subSolution?.id || subQ.id,
              question: subQ.question,
              userAnswer: subSolution?.answer || '',
              adminRating: subSolution?.adminRating,
              adminFeedback: subSolution?.adminFeedBack
            };
          })
        );
      }

      return {
        id: questionDetails.id,
        question: questionDetails.question,
        type: questionDetails.type,
        title: questionDetails.title,
        words: 0, // No main answer for comprehension
        successMarks: questionDetails.totalMarks,
        failureMarks: questionDetails.failureMarks,
        userAnswer: '', // No main answer for comprehension
        adminRating: null,
        adminFeedback: '',
        subQuestions: subQuestions
      }
    } else {
      // For regular questions (Essay/Letter), find the main solution
      const mainSolution = testAnswer.solution.find(sol => sol.questionId === questionDetails.id);
      
      return {
        id: mainSolution?.id || questionDetails.id,
        question: questionDetails.question,
        type: questionDetails.type,
        title: questionDetails.title,
        words: mainSolution?.wordsNumber || 0,
        successMarks: questionDetails.totalMarks,
        failureMarks: questionDetails.failureMarks,
        userAnswer: mainSolution?.answer || '',
        adminRating: mainSolution?.adminRating,
        adminFeedback: mainSolution?.adminFeedBack,
        subQuestions: undefined
      }
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




