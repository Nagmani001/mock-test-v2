/*
  Warnings:

  - You are about to drop the column `email` on the `TestAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `TestAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `testTitle` on the `TestAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `totalQuestions` on the `TestAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `totalTimeHour` on the `TestAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `totalTimeMinute` on the `TestAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `totalTimeSecond` on the `TestAnswer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TestAnswer_testId_key";

-- AlterTable
ALTER TABLE "TestAnswer" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "testTitle",
DROP COLUMN "totalQuestions",
DROP COLUMN "totalTimeHour",
DROP COLUMN "totalTimeMinute",
DROP COLUMN "totalTimeSecond";
