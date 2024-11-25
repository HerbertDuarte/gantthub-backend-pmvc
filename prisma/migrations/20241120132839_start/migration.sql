/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "deletedAt",
ADD COLUMN     "tarefaId" TEXT;

-- CreateTable
CREATE TABLE "projetos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "projetos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marcos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,

    CONSTRAINT "marcos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "marcoId" TEXT NOT NULL,

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarioTarefa" (
    "usuarioId" TEXT NOT NULL,
    "tarefaId" TEXT NOT NULL,

    CONSTRAINT "usuarioTarefa_pkey" PRIMARY KEY ("usuarioId","tarefaId")
);

-- CreateTable
CREATE TABLE "usuarioProjeto" (
    "tipoVinculo" INTEGER NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,

    CONSTRAINT "usuarioProjeto_pkey" PRIMARY KEY ("usuarioId","projetoId")
);

-- AddForeignKey
ALTER TABLE "marcos" ADD CONSTRAINT "marcos_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_marcoId_fkey" FOREIGN KEY ("marcoId") REFERENCES "marcos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarioTarefa" ADD CONSTRAINT "usuarioTarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarioTarefa" ADD CONSTRAINT "usuarioTarefa_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "tarefas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarioProjeto" ADD CONSTRAINT "usuarioProjeto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarioProjeto" ADD CONSTRAINT "usuarioProjeto_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
