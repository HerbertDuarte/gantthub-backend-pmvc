/*
  Warnings:

  - You are about to drop the `projetos_setores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `setores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios_setores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "projetos_setores" DROP CONSTRAINT "projetos_setores_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "projetos_setores" DROP CONSTRAINT "projetos_setores_setorId_fkey";

-- DropForeignKey
ALTER TABLE "setores" DROP CONSTRAINT "setores_setorPaiId_fkey";

-- DropForeignKey
ALTER TABLE "usuarios_setores" DROP CONSTRAINT "usuarios_setores_setorId_fkey";

-- DropForeignKey
ALTER TABLE "usuarios_setores" DROP CONSTRAINT "usuarios_setores_usuarioId_fkey";

-- DropTable
DROP TABLE "projetos_setores";

-- DropTable
DROP TABLE "setores";

-- DropTable
DROP TABLE "usuarios_setores";
