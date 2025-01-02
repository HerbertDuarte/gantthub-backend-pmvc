-- DropForeignKey
ALTER TABLE "checkItem" DROP CONSTRAINT "checkItem_checkListId_fkey";

-- DropForeignKey
ALTER TABLE "checkList" DROP CONSTRAINT "checkList_tarefaId_fkey";

-- DropForeignKey
ALTER TABLE "marcos" DROP CONSTRAINT "marcos_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_marcoId_fkey";

-- DropForeignKey
ALTER TABLE "usuarioProjeto" DROP CONSTRAINT "usuarioProjeto_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "usuarioTarefa" DROP CONSTRAINT "usuarioTarefa_tarefaId_fkey";

-- DropForeignKey
ALTER TABLE "usuarioTarefa" DROP CONSTRAINT "usuarioTarefa_usuarioId_fkey";

-- AlterTable
ALTER TABLE "tarefas" ALTER COLUMN "dataInicio" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "dataFim" SET DATA TYPE TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "marcos" ADD CONSTRAINT "marcos_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_marcoId_fkey" FOREIGN KEY ("marcoId") REFERENCES "marcos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkList" ADD CONSTRAINT "checkList_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "tarefas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkItem" ADD CONSTRAINT "checkItem_checkListId_fkey" FOREIGN KEY ("checkListId") REFERENCES "checkList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarioTarefa" ADD CONSTRAINT "usuarioTarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarioTarefa" ADD CONSTRAINT "usuarioTarefa_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "tarefas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarioProjeto" ADD CONSTRAINT "usuarioProjeto_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
