-- AlterTable
ALTER TABLE "public"."Question" ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "public"."SubQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "SubQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubSolution" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "wordsNumber" INTEGER NOT NULL,
    "status" "public"."SolutionStatus" NOT NULL,
    "adminRating" INTEGER,
    "adminFeedBack" TEXT,
    "subQuestionId" TEXT NOT NULL,
    "testAnswerId" TEXT NOT NULL,

    CONSTRAINT "SubSolution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SubQuestion" ADD CONSTRAINT "SubQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubSolution" ADD CONSTRAINT "SubSolution_testAnswerId_fkey" FOREIGN KEY ("testAnswerId") REFERENCES "public"."TestAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubSolution" ADD CONSTRAINT "SubSolution_subQuestionId_fkey" FOREIGN KEY ("subQuestionId") REFERENCES "public"."SubQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
