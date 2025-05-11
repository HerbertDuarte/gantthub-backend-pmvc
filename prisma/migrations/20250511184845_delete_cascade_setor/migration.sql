-- DropForeignKey
ALTER TABLE "projetos_setores" DROP CONSTRAINT "projetos_setores_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "projetos_setores" DROP CONSTRAINT "projetos_setores_setorId_fkey";

-- DropForeignKey
ALTER TABLE "usuarios_setores" DROP CONSTRAINT "usuarios_setores_setorId_fkey";

-- DropForeignKey
ALTER TABLE "usuarios_setores" DROP CONSTRAINT "usuarios_setores_usuarioId_fkey";

-- AddForeignKey
ALTER TABLE "usuarios_setores" ADD CONSTRAINT "usuarios_setores_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_setores" ADD CONSTRAINT "usuarios_setores_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projetos_setores" ADD CONSTRAINT "projetos_setores_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projetos_setores" ADD CONSTRAINT "projetos_setores_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
