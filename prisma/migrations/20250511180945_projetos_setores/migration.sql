-- CreateTable
CREATE TABLE "projetos_setores" (
    "projetoId" TEXT NOT NULL,
    "setorId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projetos_setores_pkey" PRIMARY KEY ("projetoId","setorId")
);

-- AddForeignKey
ALTER TABLE "projetos_setores" ADD CONSTRAINT "projetos_setores_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projetos_setores" ADD CONSTRAINT "projetos_setores_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
