/*
  Warnings:

  - Added the required column `usuarioId` to the `tarefas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tarefas" ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
