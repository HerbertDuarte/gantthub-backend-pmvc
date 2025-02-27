import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

const prisma = new PrismaClient();
const logger = new Logger('Seed');
async function main() {
  await prisma.usuarioPrisma.create({
    data: {
      nome: 'Admin',
      email: 'admin@mail.com',
      situacao: 1,
      login: 'admin',
      senha: '$2b$10$3JEcQYwkwgtT1sM0pwQn.eLRfDYZQR1YVP3JGZr.d0VCkog6YQ3oe',
      id: '1d52e4f9-ce43-48a6-b0fd-78bf5470c22f',
    },
  });
}

main()
  .catch((e) => {
    logger.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
