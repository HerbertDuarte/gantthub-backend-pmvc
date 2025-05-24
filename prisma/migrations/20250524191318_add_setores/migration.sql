-- CreateTable
CREATE TABLE "setores" (
    "setorId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL,

    CONSTRAINT "setores_pkey" PRIMARY KEY ("setorId")
);

-- CreateTable
CREATE TABLE "projeto_setor" (
    "setorId" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,

    CONSTRAINT "projeto_setor_pkey" PRIMARY KEY ("setorId","projetoId")
);

-- AddForeignKey
ALTER TABLE "projeto_setor" ADD CONSTRAINT "projeto_setor_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setores"("setorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projeto_setor" ADD CONSTRAINT "projeto_setor_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
