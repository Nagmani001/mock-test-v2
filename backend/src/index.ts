import "dotenv/config";
import {rateLimit} from "express-rate-limit";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import { testRouter } from "./routes/test";
import { reviewRouter } from "./routes/review";
import { adminUserRouter } from "./routes/adminUser";
import { adminRouter } from "./routes/admin";
import { submissionRouter } from "./routes/viewSubmission";
import { feedbackRouter } from "./routes/feedback";
import { clerkMiddleware } from "@clerk/express";
import { webhookRouter } from "./routes/webhook";
import { authMiddleware } from "./middleware.ts/middleware";
import { resultRouter } from "./routes/result";


declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  
	limit: 500,  
	standardHeaders: 'draft-8',  
	legacyHeaders: false,  
	ipv6Subnet: 64, 
});

const app = express();
app.use(limiter);
app.use(express.json());

// domains
app.use(cors({
  origin: [
    "https://adminside-87i.pages.dev",
    "https://mock-test-platform.pages.dev",
    "http://localhost:5173",
    "http://localhost:5174",
  ],
  allowedHeaders: "*",   // allow all headers
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // optional, defaults cover most
  credentials: true }
));

// user side routes
app.use("/api/v1/user", clerkMiddleware(), userRouter);
app.use("/api/v1/test", clerkMiddleware(), testRouter);
app.use("/api/v1/review", clerkMiddleware(), reviewRouter);


// admin side routes
app.use("/api/v1/admin/user", adminUserRouter);

app.use("/api/v1/admin/", authMiddleware, adminRouter);
app.use("/api/v1/admin/submission", authMiddleware, submissionRouter);

app.use("/api/v1/admin/feedback", authMiddleware, feedbackRouter);
app.use("/api/webhook/user", webhookRouter);
app.use("/api",clerkMiddleware(), resultRouter);




app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
