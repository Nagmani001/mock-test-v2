/*
  Warnings:

  - You are about to drop the column `testId` on the `Solution` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Solution` table. All the data in the column will be lost.
  - Added the required column `failureMarks` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `successMarks` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solutionTimeHour` to the `Solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solutionTimeMinute` to the `Solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solutionTimeSecond` to the `Solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testAnswerId` to the `Solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wordsNumber` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnswerType" AS ENUM ('Paused', 'Completed');

-- AlterEnum
ALTER TYPE "TestType" ADD VALUE 'COMPREHENSION';

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_testId_fkey";

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_userId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "failureMarks" INTEGER NOT NULL,
ADD COLUMN     "successMarks" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "testId",
DROP COLUMN "userId",
ADD COLUMN     "solutionTimeHour" INTEGER NOT NULL,
ADD COLUMN     "solutionTimeMinute" INTEGER NOT NULL,
ADD COLUMN     "solutionTimeSecond" INTEGER NOT NULL,
ADD COLUMN     "testAnswerId" TEXT NOT NULL,
ADD COLUMN     "wordsNumber" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TestAnswer" (
    "id" TEXT NOT NULL,
    "type" "AnswerType" NOT NULL,
    "remainingSecond" INTEGER NOT NULL,
    "remainingMinute" INTEGER NOT NULL,
    "remainingHour" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,

    CONSTRAINT "TestAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestAnswer_testId_key" ON "TestAnswer"("testId");

-- AddForeignKey
ALTER TABLE "TestAnswer" ADD CONSTRAINT "TestAnswer_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestAnswer" ADD CONSTRAINT "TestAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_testAnswerId_fkey" FOREIGN KEY ("testAnswerId") REFERENCES "TestAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
