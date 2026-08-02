import { PrismaClient } from '@prisma/client';

// Reutiliza a mesma conexão durante os reinícios feitos pelo ts-node-dev.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { prisma };
