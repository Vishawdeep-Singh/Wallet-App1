'use server';
import { ServerSessionUser } from '@repo/interfaces/interfaces';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/lib/auth';
import prisma from '@repo/db/client';

export const UsertoMerchantPay = async (id: string, amount: Number) => {
  try {
    const session: {
      user: ServerSessionUser;
    } | null = await getServerSession(authOptions);

    if (!session?.user || !session.user?.id) {
      return {
        message: 'Unauthenticated Request',
        status: 'error',
      };
    }

    await prisma.$transaction(async (tx: any) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user.id)} FOR UPDATE`;
      const fromBalance = await tx.balance.findUnique({
        where: {
          userId: Number(session.user.id),
        },
      });

      // console.log("above sleep");
      // await new Promise(resolve => setTimeout(resolve,4000))
      // console.log("after sleep");

      if (!fromBalance || amount > fromBalance.amount) {
        throw new Error('Insufficient funds');
      }

      await tx.balance.update({
        where: {
          userId: Number(session.user.id),
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });

      await tx.merchantBalance.upsert({
        where: {
          merchantId: String(id),
        },
        update: {
          amount: {
            increment: amount,
          },
        },
        create: {
          merchantId: String(id),
          amount: amount,
          locked: 0,
        },
      });

      console.log('JJDKJFKJDLKJFDLKJF', prisma);

      await tx.user2merchantTx.create({
        data: {
          amount: Number(amount),
          fromUserId: Number(session.user.id),
          toMerchantId: String(id),
          timestamp: new Date(),
          status: 'Success',
        },
      });
    });
    return {
      message: 'Transfer completed successfully',
      status: 'success',
    };
  } catch (error: any) {
    console.log(error);
    return {
      message:
        error.message ||
        'An error occurred during the transaction of user to merchant',
      status: 'error',
    };
  }
};
