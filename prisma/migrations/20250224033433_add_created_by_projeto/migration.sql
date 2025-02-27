-- AlterTable
ALTER TABLE "projetos" ADD COLUMN     "createdById" TEXT NOT NULL DEFAULT '1d52e4f9-ce43-48a6-b0fd-78bf5470c22f';

-- AddForeignKey
ALTER TABLE "projetos" ADD CONSTRAINT "projetos_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
