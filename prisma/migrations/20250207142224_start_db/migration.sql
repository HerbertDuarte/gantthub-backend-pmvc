/*
 Warnings:
 
 - You are about to drop the `checkItem` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `checkList` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `usuarioProjeto` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `usuarioTarefa` table. If the table is not empty, all the data it contains will be lost.
 
 */
-- DropForeignKey
ALTER TABLE
  "checkItem" DROP CONSTRAINT "checkItem_checkListId_fkey";

-- DropForeignKey
ALTER TABLE
  "checkList" DROP CONSTRAINT "checkList_tarefaId_fkey";

-- DropForeignKey
ALTER TABLE
  "usuarioProjeto" DROP CONSTRAINT "usuarioProjeto_projetoId_fkey";

-- DropForeignKey
ALTER TABLE
  "usuarioProjeto" DROP CONSTRAINT "usuarioProjeto_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE
  "usuarioTarefa" DROP CONSTRAINT "usuarioTarefa_tarefaId_fkey";

-- DropForeignKey
ALTER TABLE
  "usuarioTarefa" DROP CONSTRAINT "usuarioTarefa_usuarioId_fkey";

-- AlterTable
ALTER TABLE
  "marcos"
ADD
  COLUMN "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE
  "tarefas"
ADD
  COLUMN "tarefaPaiId" TEXT;

-- AlterTable
ALTER TABLE
  "usuarios"
ADD
  COLUMN "role" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "checkItem";

-- DropTable
DROP TABLE "checkList";

-- DropTable
DROP TABLE "usuarioProjeto";

-- DropTable
DROP TABLE "usuarioTarefa";

-- CreateTable
CREATE TABLE "setores" (
  "id" TEXT NOT NULL,
  "nome" TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "setorPaiId" TEXT,
  CONSTRAINT "setores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios_setores" (
  "usuarioId" TEXT NOT NULL,
  "setorId" TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "usuarios_setores_pkey" PRIMARY KEY ("usuarioId", "setorId")
);

-- AddForeignKey
ALTER TABLE
  "tarefas"
ADD
  CONSTRAINT "tarefas_tarefaPaiId_fkey" FOREIGN KEY ("tarefaPaiId") REFERENCES "tarefas"("id") ON DELETE
SET
  NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  "setores"
ADD
  CONSTRAINT "setores_setorPaiId_fkey" FOREIGN KEY ("setorPaiId") REFERENCES "setores"("id") ON DELETE
SET
  NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  "usuarios_setores"
ADD
  CONSTRAINT "usuarios_setores_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  "usuarios_setores"
ADD
  CONSTRAINT "usuarios_setores_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;