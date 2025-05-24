-- CreateTable
CREATE TABLE "projeto_usuario" (
    "usuarioId" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,

    CONSTRAINT "projeto_usuario_pkey" PRIMARY KEY ("usuarioId","projetoId")
);

-- AddForeignKey
ALTER TABLE "projeto_usuario" ADD CONSTRAINT "projeto_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projeto_usuario" ADD CONSTRAINT "projeto_usuario_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
