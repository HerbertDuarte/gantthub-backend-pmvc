"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
const prisma = new client_1.PrismaClient();
const logger = new common_1.Logger('Seed');
async function main() {
    await prisma.usuarioPrisma.create({
        data: {
            nome: 'Admin',
            email: 'admin@mail.com',
            situacao: 1,
            login: 'admin',
            senha: '$2b$10$3JEcQYwkwgtT1sM0pwQn.eLRfDYZQR1YVP3JGZr.d0VCkog6YQ3oe',
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
//# sourceMappingURL=seed.js.map