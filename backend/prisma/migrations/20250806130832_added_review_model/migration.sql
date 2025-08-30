-- CreateEnum
CREATE TYPE "ReviewMeaning" AS ENUM ('Poor', 'Needs_Improvement', 'Satisfactory', 'Good', 'Excellent');

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "sectionId" TEXT NOT NULL DEFAULT 'Descriptive writing';

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "meaning" "ReviewMeaning" NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
