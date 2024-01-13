import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'Fred',
      lastName: 'Marshall',
      email: 'fredmarshal@testing.com',
      password: 'password',
    },
  });
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
