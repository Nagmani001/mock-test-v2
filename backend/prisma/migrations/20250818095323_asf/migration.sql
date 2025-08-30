/*
  Warnings:

  - You are about to drop the `SolutionGrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestAnswerGrade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SolutionGrade" DROP CONSTRAINT "SolutionGrade_solutionId_fkey";

-- DropForeignKey
ALTER TABLE "TestAnswerGrade" DROP CONSTRAINT "TestAnswerGrade_testAnswerId_fkey";

-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "adminFeedBack" TEXT,
ADD COLUMN     "adminRating" INTEGER,
ADD COLUMN     "isCorrect" BOOLEAN,
ADD COLUMN     "score" INTEGER;

-- AlterTable
ALTER TABLE "TestAnswer" ADD COLUMN     "percentage" INTEGER,
ADD COLUMN     "status" "TestStatus";

-- DropTable
DROP TABLE "SolutionGrade";

-- DropTable
DROP TABLE "TestAnswerGrade";
