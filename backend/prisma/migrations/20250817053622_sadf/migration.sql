/*
  Warnings:

  - Added the required column `type` to the `TestAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestAnswer" ADD COLUMN     "type" "AnswerType" NOT NULL;
