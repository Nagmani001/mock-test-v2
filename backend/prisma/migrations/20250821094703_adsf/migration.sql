/*
  Warnings:

  - You are about to drop the column `questionTimeMinute` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `questionTimeSecond` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `solutionTimeMinute` on the `Solution` table. All the data in the column will be lost.
  - You are about to drop the column `solutionTimeSecond` on the `Solution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "questionTimeMinute",
DROP COLUMN "questionTimeSecond";

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "solutionTimeMinute",
DROP COLUMN "solutionTimeSecond";
