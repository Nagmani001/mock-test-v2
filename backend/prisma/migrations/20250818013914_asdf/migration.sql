-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "adminFeedBack" TEXT NOT NULL DEFAULT 'asdf',
ADD COLUMN     "adminRating" INTEGER DEFAULT 10,
ADD COLUMN     "isCorrect" BOOLEAN DEFAULT true;
