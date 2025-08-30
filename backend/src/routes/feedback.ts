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

  let totalMarks = 0;

  Promise.all(
    parsedData.data.rating.map(async (x: any) => {
      console.log(x.key);
      const solution = await prisma.solution.findFirst({
        where: {
          id: x.key
        }
      });
      console.log("solution", solution);
      const question = await prisma.question.findFirst({
        where: {
          id: solution?.questionId
        }
      });
      console.log("question", question);
      if (!question?.totalMarks) {
        return;
      }
      totalMarks += question.totalMarks
    })
  )
  //TODO: resolve this 
  await new Promise(r => setTimeout(r, 2000));

  let obtainedMarks = 0;

  parsedData.data.rating.forEach(x => {
    obtainedMarks += x.value;
  });

  // Add sub-question ratings to obtained marks
  if (parsedData.data.subRating) {
    parsedData.data.subRating.forEach(x => {
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
