-- AlterTable
ALTER TABLE "projetos" ALTER COLUMN "createdById" DROP DEFAULT;

-- CreateTable
CREATE TABLE "usuario_projeto" (
    "projetoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_projeto_pkey" PRIMARY KEY ("projetoId","usuarioId")
);

-- AddForeignKey
ALTER TABLE "usuario_projeto" ADD CONSTRAINT "usuario_projeto_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_projeto" ADD CONSTRAINT "usuario_projeto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
