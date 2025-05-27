/*
  Warnings:

  - You are about to drop the `projeto_usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "projeto_usuario" DROP CONSTRAINT "projeto_usuario_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "projeto_usuario" DROP CONSTRAINT "projeto_usuario_usuarioId_fkey";

-- AlterTable
ALTER TABLE "projetos" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "projeto_usuario";

-- CreateTable
CREATE TABLE "usuario_setor" (
    "usuarioId" TEXT NOT NULL,
    "setorId" TEXT NOT NULL,

    CONSTRAINT "usuario_setor_pkey" PRIMARY KEY ("usuarioId","setorId")
);

-- AddForeignKey
ALTER TABLE "usuario_setor" ADD CONSTRAINT "usuario_setor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_setor" ADD CONSTRAINT "usuario_setor_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setores"("setorId") ON DELETE RESTRICT ON UPDATE CASCADE;
