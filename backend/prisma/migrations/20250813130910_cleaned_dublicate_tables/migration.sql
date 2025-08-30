/*
  Warnings:

  - You are about to drop the column `passingMarks` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Test` table. All the data in the column will be lost.
  - Added the required column `percentage` to the `TestAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `TestAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSpent` to the `TestAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('graded', 'pending');

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "passingMarks";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "language";

-- AlterTable
ALTER TABLE "TestAnswer" ADD COLUMN     "percentage" INTEGER NOT NULL,
ADD COLUMN     "status" "TestStatus" NOT NULL,
ADD COLUMN     "timeSpent" TEXT NOT NULL;
