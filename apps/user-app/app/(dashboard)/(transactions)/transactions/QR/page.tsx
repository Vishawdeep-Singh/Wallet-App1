import { ServerSessionUser } from "@repo/interfaces/interfaces";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../../lib/auth";
import prisma from "@repo/db/client";
import { Card1 } from "@repo/ui/card1";
import { OnRampStatus1 } from "@repo/db/enum";

async function getTx() {
  const session: { user: ServerSessionUser } | null =
    await getServerSession(authOptions);
  const txns = await prisma.user.findUnique({
    where: {
      id: Number(session?.user?.id),
    },
    select: {
      SentMerchantTransfers: {
        include: {
          toMerchant: true,
        },
      },
    },
  });
  return txns;
}

export default async function () {
  const session: {
    user: ServerSessionUser;
  } | null = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }

  const txns = await getTx();

  const sortedTxns = txns?.SentMerchantTransfers?.sort((a: any, b: any) => {
    // Convert timestamps to Date objects and compare
    const dateA = new Date(a.timestamp as string); // Assert timestamp is a string
    const dateB = new Date(b.timestamp as string);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="h-screen flex items-center">
      <div className="md:w-[50%] w-full p-5  md:ml-60">
        <Card1 title="Recent Transactions">
          <div className="pt-2">
            {sortedTxns?.map((t, index) => (
              <div key={index} className="flex justify-between py-3">
                <div>
                  {t.fromUserId === Number(session?.user?.id) && (
                    <div className="md:text-md  text-sm font-semibold">
                      Sent INR TO {t.toMerchant.name}
                    </div>
                  )}

                  <div className="text-slate-600 text-xs">
                    {t.timestamp.toDateString()}
                  </div>
                  <div className={`text-xs mt-1 font-semibold ${getStatusStyle(t.status)}`}>
                {t.status}
              </div>
                </div>
                {t.fromUserId === Number(session?.user?.id) && (
                  <div className="flex flex-col justify-center">
                    - Rs {t.amount / 100}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card1>
      </div>
    </div>
  );
}

const getStatusStyle = (status: OnRampStatus1) => {
  switch (status) {
    case 'Success':
      return 'text-green-600';
    case 'Processing':
      return 'text-yellow-600';
    case 'Failure':
      return 'text-red-600';
    default:
      return 'text-slate-600';
  }
};