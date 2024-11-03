/*
  Warnings:

  - Changed the type of `nivel` on the `usuarios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `situacao` on the `usuarios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Nivel" AS ENUM ('Administrador', 'Usuario');

-- CreateEnum
CREATE TYPE "Situacao" AS ENUM ('Ativo', 'Inativo');

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "nivel",
ADD COLUMN     "nivel" "Nivel" NOT NULL,
DROP COLUMN "situacao",
ADD COLUMN     "situacao" "Situacao" NOT NULL;
