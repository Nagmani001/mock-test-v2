-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "questionId" TEXT NOT NULL DEFAULT 'Asdf';

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
