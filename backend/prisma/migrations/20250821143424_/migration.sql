/*
  Warnings:

  - You are about to drop the column `questionId` on the `Solution` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_questionId_fkey";

-- DropIndex
DROP INDEX "Solution_questionId_key";

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "questionId";
