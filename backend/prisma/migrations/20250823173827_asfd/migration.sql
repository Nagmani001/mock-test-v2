/*
  Warnings:

  - A unique constraint covering the columns `[userId,testId]` on the table `TestAnswer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TestAnswer_userId_testId_key" ON "TestAnswer"("userId", "testId");
