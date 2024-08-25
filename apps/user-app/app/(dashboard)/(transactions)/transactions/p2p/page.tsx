import { ServerSessionUser } from '@repo/interfaces/interfaces';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../../lib/auth';
import prisma from '@repo/db/client';
import { MotionP2PTx } from '../../../../../components/motionTxP2P';

async function getP2PTx() {
  const session: { user: ServerSessionUser } | null =
    await getServerSession(authOptions);
  const txns = await prisma.user.findUnique({
    where: {
      id: Number(session?.user?.id),
    },
    select: {
      sentTransfers: {
        include: {
          toUser: true,
          fromUser: true,
        },
      },
      receivedTransfers: {
        include: {
          toUser: true,
          fromUser: true,
        },
      },
    },
  });
  return txns;
}

export default async function () {
  const session: { user: ServerSessionUser } | null =
    await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/signin');
  }
  const txs = await getP2PTx();
  const alltxns = txs?.sentTransfers.concat(txs.receivedTransfers);
  const sortedTxns = alltxns?.sort((a: any, b: any) => {
    // Convert timestamps to Date objects and compare
    const dateA = new Date(a.timestamp as string); // Assert timestamp is a string
    const dateB = new Date(b.timestamp as string);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className=" h-screen flex justify-center items-center">
      <MotionP2PTx session={session} sortedTxns={sortedTxns}></MotionP2PTx>
    </div>
  );
}
