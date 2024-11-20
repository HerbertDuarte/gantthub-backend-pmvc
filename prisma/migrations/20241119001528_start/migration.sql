/*
  Warnings:

  - You are about to drop the column `nivel` on the `usuarios` table. All the data in the column will be lost.
  - The `situacao` column on the `usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "nivel",
DROP COLUMN "situacao",
ADD COLUMN     "situacao" INTEGER NOT NULL DEFAULT 1;
