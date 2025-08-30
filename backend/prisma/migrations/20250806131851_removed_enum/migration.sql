/*
  Warnings:

  - Changed the type of `meaning` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "meaning",
ADD COLUMN     "meaning" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ReviewMeaning";
