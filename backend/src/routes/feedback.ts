import { Router, Request, Response } from "express";
import { feedBackSchema } from "../types/zodTypes";
import prisma from "../prisma";

export const feedbackRouter = Router();

feedbackRouter.post("/grade", async (req: Request, res: Response) => {
  const parsedData = feedBackSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.json({
      msg: "invalid data",
    });
    return;
  }

  // Handle regular question feedback
  Promise.all(
    parsedData.data.feedbacks.map(async (x: any) => {
      await prisma.solution.update({
        where: {
          id: x.key
        },
        data: {
          adminFeedBack: x.value
        }
      });
    })
  )

  Promise.all(
    parsedData.data.rating.map(async (x: any) => {
      await prisma.solution.update({
        where: {
          id: x.key
        },
        data: {
          adminRating: x.value
        }
      });
    })
  )

  // Handle sub-question feedback
  if (parsedData.data.subFeedbacks) {
    Promise.all(
      parsedData.data.subFeedbacks.map(async (x: any) => {
        await prisma.subSolution.update({
          where: {
            id: x.key
          },
          data: {
            adminFeedBack: x.value
          }
        });
      })
    )
  }

  if (parsedData.data.subRating) {
    Promise.all(
      parsedData.data.subRating.map(async (x: any) => {
        await prisma.subSolution.update({
          where: {
            id: x.key
          },
          data: {
            adminRating: x.value
          }
        });
      })
    )
  }

  // Get the test answer to find the test ID
  const testAnswer = await prisma.testAnswer.findFirst({
    where: { id: parsedData.data.id }
  });

  if (!testAnswer) {
    res.json({ msg: "Test answer not found" });
    return;
  }

  // Get all questions for this test to calculate total marks correctly
  const allQuestions = await prisma.question.findMany({
    where: { testId: testAnswer.testId }
  });

  // Calculate total marks from all questions
  let totalMarks = 0;
  allQuestions.forEach(question => {
    totalMarks += question.totalMarks;
  });

  // Calculate obtained marks from regular questions
  let obtainedMarks = 0;
  parsedData.data.rating.forEach((x: any) => {
    obtainedMarks += x.value;
  });

  // Add sub-question ratings to obtained marks (for comprehension questions)
  if (parsedData.data.subRating) {
    parsedData.data.subRating.forEach((x: any) => {
      obtainedMarks += x.value;
    });
  }

  console.log("obtainedMarks", obtainedMarks);
  console.log("totalMarks", totalMarks);

  const percentage = (obtainedMarks / totalMarks) * 100;

  console.log("percentage", percentage);
  await prisma.testAnswer.update({
    where: {
      id: parsedData.data.id
    },
    data: {
      status: "graded",
      percentage,
    }
  });

  res.json({
    msg: "success"
  })
});
