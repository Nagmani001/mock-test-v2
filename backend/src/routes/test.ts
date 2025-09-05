import { Router, Request, Response } from "express";
import { clerkClient, getAuth, requireAuth } from "@clerk/express";
import prisma from "../prisma";
import { pauseOrSubmitSchema } from "../types/zodTypes";

export const testRouter = Router();

testRouter.get("/", async (req: Request, res: Response) => {
  const tests = await prisma.test.findMany();
  res.json({
    tests,
  });
});


/*
testRouter.get("/userSpecificTest", async (req: Request, res: Response) => {
const userId = "user_31eJvLsN5N2Yj9LYjdUctPJY844";
const tests = await prisma.test.findMany({
  include: {
    Test: true
  }
});
console.log("test", tests);
/*
const pausedOrNot = await prisma.testAnswer.findMany({
  where: {
    userId,
    type: "Paused"
  }
});

const resultViewable = await prisma.testAnswer.findMany({
  where: {
    userId
  }
});

//TODO: computation logic can be optimized
const finalTest = tests.map(x => {
  for (let i = 0; i < resultViewable.length; i++) {
    if (x.id == resultViewable[i].testId && resultViewable[i].status == "graded") {
      return {
        ...x,
      }
    }
  }

});

console.log("test", tests);
console.log("resultViewable", resultViewable);
console.log("finalTest", finalTest);

res.json({
  msg: "Asdf"
});
})
*/

testRouter.get("/:testId", async (req: Request, res: Response) => {
  const testId = req.params.testId;
  const test = await prisma.test.findFirst({
    where: {
      id: testId
    },
    include: {
      question: {
        include: {
          subQuestions: true
        }
      }
    }
  });
  res.json({
    msg: test
  })
});

testRouter.post("/submit", requireAuth(), async (req: Request, res: Response) => {

  const parsedData = pauseOrSubmitSchema.safeParse(req.body);
  const { userId } = getAuth(req);

  const testDetails = await prisma.test.findFirst({ where: { id: parsedData.data?.testId } });
  if (!parsedData.success || !userId || !testDetails) {
    res.json({
      msg: "invalid data"
    });
    return;
  };
  const totalTime = (testDetails.totalTimeHour * 3600) + (testDetails.totalTimeMinute * 60) + (testDetails.totalTimeSecond);
  const totalRemainingTime = (parsedData.data.remainingHour * 3600) + (parsedData.data.remainingMinute * 60) + (parsedData.data.remainingSecond);
  const timeSpentSecond = totalTime - totalRemainingTime;

  const totalTimeSpentHour = Math.floor(timeSpentSecond / 3600);
  const totalTimeSpentMinute = Math.floor((timeSpentSecond % 3600) / 60);
  const totalTimeSpentSecond = timeSpentSecond % 60;
  const timeSpent = `${totalTimeSpentHour}h ${totalTimeSpentMinute}m ${totalTimeSpentSecond}s`;

  try {
    // First, get question types to determine which solutions to create
    const questions = await prisma.question.findMany({
      where: { testId: parsedData.data.testId },
      select: { id: true, type: true }
    });

    // Filter solutions based on question type
    const regularSolutions = parsedData.data.solution.filter((sol: any) => {
      const question = questions.find(q => q.id === sol.questionId);
      return question?.type !== 'COMPREHENSION';
    });

    await prisma.testAnswer.create({
      data: {
        timeSpent,
        type: parsedData.data.type,
        remainingHour: parsedData.data.remainingHour,
        remainingMinute: parsedData.data.remainingMinute,
        remainingSecond: parsedData.data.remainingSecond,
        submittedAt: parsedData.data.submittedAt,
        userId,
        testId: parsedData.data.testId,
        // Only create solutions for non-comprehension questions
        solution: regularSolutions.length > 0 ? {
          create: regularSolutions
        } : undefined,
        // Create sub-solutions for comprehension questions
        subSolution: parsedData.data.subSolution ? {
          create: parsedData.data.subSolution
        } : undefined
      }
    });

    res.json({
      msg: "submitted"
    });
    return;
  } catch (err) {
    console.log(err);
    res.json({
      msg: "error while submitting request"
    })
  }
});

testRouter.post("/pause", requireAuth(), async (req: Request, res: Response) => {
  const parsedData = pauseOrSubmitSchema.safeParse(req.body);
  const { userId } = getAuth(req);
  if (!parsedData.success || !userId) {
    res.json({
      msg: "invalid data"
    });
    return;
  };

  const user = await clerkClient.users.getUser(userId)

  const testDetails = await prisma.test.findFirst({
    where: {
      id: parsedData.data.testId
    }
  });

  if (!testDetails) {
    return;
  }

  const totalTime = (testDetails.totalTimeHour * 3600) + (testDetails.totalTimeMinute * 60) + (testDetails.totalTimeSecond);
  const totalRemainingTime = (parsedData.data.remainingHour * 3600) + (parsedData.data.remainingMinute * 60) + (parsedData.data.remainingSecond);
  const timeSpentSecond = totalTime - totalRemainingTime;

  const totalTimeSpentHour = Math.floor(timeSpentSecond / 3600);
  const totalTimeSpentMinute = Math.floor((timeSpentSecond % 3600) / 60);
  const totalTimeSpentSecond = timeSpentSecond % 60;
  const timeSpent = `${totalTimeSpentHour}h ${totalTimeSpentMinute}m ${totalTimeSpentSecond}s`;

  try {
    // First, get question types to determine which solutions to create
    const questions = await prisma.question.findMany({
      where: { testId: parsedData.data.testId },
      select: { id: true, type: true }
    });

    // Filter solutions based on question type
    const regularSolutions = parsedData.data.solution.filter((sol: any) => {
      const question = questions.find(q => q.id === sol.questionId);
      return question?.type !== 'COMPREHENSION';
    });

    await prisma.testAnswer.create({
      data: {
        timeSpent,
        remainingHour: parsedData.data.remainingHour,
        remainingMinute: parsedData.data.remainingMinute,
        type: parsedData.data.type,
        remainingSecond: parsedData.data.remainingSecond,
        submittedAt: parsedData.data.submittedAt,
        userId,
        testId: parsedData.data.testId,
        // Only create solutions for non-comprehension questions
        solution: regularSolutions.length > 0 ? {
          create: regularSolutions
        } : undefined,
        // Create sub-solutions for comprehension questions
        subSolution: parsedData.data.subSolution ? {
          create: parsedData.data.subSolution
        } : undefined
      }
    });
    res.json({
      msg: "paused"
    })
  } catch (err) {
    console.log("error", err);
    res.json({
      msg: "error while submitting request"
    })
  }
});
