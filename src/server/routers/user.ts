import { createRouter } from 'server/createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const userRouter = createRouter()
  .query('byId', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const id = input;
      const user = await ctx.prisma.user
        .findUnique({
          where: { id },
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            posts: {
              select: {
                title: true,
              },
            },
          },
          // include: { posts: true },
          // => filter: { password: true }
        })
        .then((user) => ({
          ...user,
          name: `${user?.username} => ${user?.email}`,
        }));

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${id}'`,
        });
      }
      return user;
    },
  })
  // .middleware(({ ctx, next }) => {
  //   const isProd = ctx.meta.env === 'production';
  //   if (!isProd) {
  //     throw new TRPCError({
  //       code: 'FORBIDDEN',
  //       message: `We can only do this in prod!`,
  //     });
  //   }
  //   return next();
  // })
  .mutation('create', {
    input: z.object({
      username: z.string(),
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      //
    },
  });
