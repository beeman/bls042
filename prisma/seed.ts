/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      id: '5c03994c-fc16-47e0-bd02-d218a370a071',
    },
    create: {
      id: '5c03994c-fc16-47e0-bd02-d218a370a071',
      username: 'alex',
      email: 'alex@trpc.io',
      password: 'hunter42',
    },
    update: {},
  });
  await prisma.post.upsert({
    where: {
      id: '5c03994c-fc16-47e0-bd02-d218a370a078',
    },
    create: {
      id: '5c03994c-fc16-47e0-bd02-d218a370a078',
      title: 'First Post',
      text: 'This is an example post generated from `prisma/seed.ts`',
      owner: {
        connect: {
          id: '5c03994c-fc16-47e0-bd02-d218a370a071',
        },
      },
    },
    update: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
