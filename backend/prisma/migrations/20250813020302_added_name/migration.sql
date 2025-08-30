/*
  Warnings:

  - You are about to drop the column `questionTimeHour` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "questionTimeHour",
ADD COLUMN     "questionTimeSecond" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Solution" ALTER COLUMN "score" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TestAnswer" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'asdf';
