import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "../../../lib/auth";
import { ServerSessionUser } from "@repo/interfaces/interfaces";
import prisma from "@repo/db/client";
import { MotionTxBank } from "../../../../components/motionTxBank";

async function getOnRampTransactions() {
    const session:{user:ServerSessionUser} | null = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
   
    return txns.map(t => ({
        startTime: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}
async function getOffRampTransactions() {
    const session:{user:ServerSessionUser} | null = await getServerSession(authOptions);
    const txns = await prisma.offRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    
    return txns.map(t => ({
        startTime: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function Transactions() {
    const session:{user:ServerSessionUser} | null = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/signin')
    } 

    const offrampTx = await getOffRampTransactions();
    const onrampTx=await getOnRampTransactions();
    
    
   
    
    const allTransactions = offrampTx.concat(onrampTx)
    const OnRampsortedTxns = onrampTx?.sort((a:any, b:any) => {
        // Convert timestamps to Date objects and compare
        const dateA = new Date(a.startTime as string); // Assert timestamp is a string
        const dateB = new Date(b.startTime as string); 
        return dateB.getTime() - dateA.getTime();
      });
      console.log(onrampTx)
    const OffRampsortedTxns = offrampTx?.sort((a:any, b:any) => {
        // Convert timestamps to Date objects and compare
        const dateA = new Date(a.startTime as string); // Assert timestamp is a string
        const dateB = new Date(b.startTime as string); 
        return dateB.getTime() - dateA.getTime();
      });
      

    return <div className="w-[95%] mt-36">
        <MotionTxBank OffRampsortedTxns={OffRampsortedTxns} OnRampsortedTxns={OnRampsortedTxns} ></MotionTxBank>
    </div>
}


