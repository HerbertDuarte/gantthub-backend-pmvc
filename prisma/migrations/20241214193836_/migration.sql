/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `projetos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tarefas` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projetos" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "tarefas" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "checkList" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tarefaId" TEXT NOT NULL,

    CONSTRAINT "checkList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkItem" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkListId" TEXT NOT NULL,

    CONSTRAINT "checkItem_pkey" PRIMARY KEY ("checkListId","id")
);

-- AddForeignKey
ALTER TABLE "checkList" ADD CONSTRAINT "checkList_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "tarefas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkItem" ADD CONSTRAINT "checkItem_checkListId_fkey" FOREIGN KEY ("checkListId") REFERENCES "checkList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
