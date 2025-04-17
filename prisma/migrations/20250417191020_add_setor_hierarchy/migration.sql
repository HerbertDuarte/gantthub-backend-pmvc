-- AlterTable
ALTER TABLE "setores" ADD COLUMN     "setorPaiId" TEXT;

-- AddForeignKey
ALTER TABLE "setores" ADD CONSTRAINT "setores_setorPaiId_fkey" FOREIGN KEY ("setorPaiId") REFERENCES "setores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
