-- DropForeignKey
ALTER TABLE "Process" DROP CONSTRAINT "Process_parentId_fkey";

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Process"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
