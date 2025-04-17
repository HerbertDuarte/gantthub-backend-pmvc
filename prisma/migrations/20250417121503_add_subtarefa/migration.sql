/*
  Warnings:

  - You are about to drop the column `setorPaiId` on the `setores` table. All the data in the column will be lost.
  - You are about to drop the column `tarefaPaiId` on the `tarefas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "setores" DROP CONSTRAINT "setores_setorPaiId_fkey";

-- DropForeignKey
ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_tarefaPaiId_fkey";

-- AlterTable
ALTER TABLE "setores" DROP COLUMN "setorPaiId";

-- AlterTable
ALTER TABLE "tarefas" DROP COLUMN "tarefaPaiId";

-- CreateTable
CREATE TABLE "sub_tarefas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "justificativa" TEXT,
    "usuarioId" TEXT NOT NULL,
    "tarefaPaiId" TEXT NOT NULL,

    CONSTRAINT "sub_tarefas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sub_tarefas" ADD CONSTRAINT "sub_tarefas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_tarefas" ADD CONSTRAINT "sub_tarefas_tarefaPaiId_fkey" FOREIGN KEY ("tarefaPaiId") REFERENCES "tarefas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
