/*
  Warnings:

  - You are about to drop the column `adminFeedBack` on the `Solution` table. All the data in the column will be lost.
  - You are about to drop the column `adminRating` on the `Solution` table. All the data in the column will be lost.
  - You are about to drop the column `isCorrect` on the `Solution` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Solution` table. All the data in the column will be lost.
  - You are about to drop the column `percentage` on the `TestAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `TestAnswer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "adminFeedBack",
DROP COLUMN "adminRating",
DROP COLUMN "isCorrect",
DROP COLUMN "score";

-- AlterTable
ALTER TABLE "TestAnswer" DROP COLUMN "percentage",
DROP COLUMN "status";

-- CreateTable
CREATE TABLE "TestAnswerGrade" (
    "id" TEXT NOT NULL,
    "status" "TestStatus" NOT NULL,
    "percentage" INTEGER NOT NULL,
    "testAnswerId" TEXT NOT NULL,

    CONSTRAINT "TestAnswerGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolutionGrade" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "adminRating" INTEGER NOT NULL,
    "adminFeedBack" TEXT NOT NULL,
    "solutionId" TEXT NOT NULL,

    CONSTRAINT "SolutionGrade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestAnswerGrade_testAnswerId_key" ON "TestAnswerGrade"("testAnswerId");

-- CreateIndex
CREATE UNIQUE INDEX "SolutionGrade_solutionId_key" ON "SolutionGrade"("solutionId");

-- AddForeignKey
ALTER TABLE "TestAnswerGrade" ADD CONSTRAINT "TestAnswerGrade_testAnswerId_fkey" FOREIGN KEY ("testAnswerId") REFERENCES "TestAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolutionGrade" ADD CONSTRAINT "SolutionGrade_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
