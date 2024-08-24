

import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "../../../lib/auth";
import { MotionCards } from "../../../../components/MotionedCards";
import prisma from "@repo/db/client";
import { ServerSessionUser } from "@repo/interfaces/interfaces";

async function getBalance() {
    const session:{user:ServerSessionUser} | null = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });

    
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}
async function getOnRampTransactions() {
    const session:{user:ServerSessionUser} | null = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}
export default async function Add() {
    const session:{user:ServerSessionUser} | null = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/signin')
    } 
    const balance = await getBalance();
    const transactions=await getOnRampTransactions();
    const sortedtransactions = transactions.sort((a:any,b:any)=>{
        const dateA = new Date(a.time as string); // Assert timestamp is a string
        const dateB = new Date(b.time as string); 
        return dateB.getTime() - dateA.getTime();
    })
    
    
    return <div className="w-full">


    <MotionCards isAdd={true} balance={balance} transactions={sortedtransactions}></MotionCards>
   
    </div>
}