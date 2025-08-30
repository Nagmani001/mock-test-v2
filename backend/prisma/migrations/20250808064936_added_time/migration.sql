/*
  Warnings:

  - You are about to drop the column `time` on the `Test` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "time",
ADD COLUMN     "totalTimeHour" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalTimeMinute" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalTimeSecond" INTEGER NOT NULL DEFAULT 0;
