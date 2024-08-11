

import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "../../lib/auth";
import { AddMoney } from "../../../components/addMoneycard";
import { Balance } from "../../../components/Balance";
import { OnRampTransactions } from "../../../components/onRampTransactions";
import { MotionCards } from "../../../components/MotionedCards";
import prisma from "@repo/db/client";

async function getBalance() {
    const session = await getServerSession(authOptions);
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
    const session = await getServerSession(authOptions);
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
export default async function Transactions() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/signin')
    } 
    const balance = await getBalance();
    const transactions=await getOnRampTransactions();
    
    
    return <div className="w-screen">


    <div className="text-4xl text-[#5640d7] pt-28 p-10 font-bold">
        Transfer
    </div>
    <MotionCards balance={balance} transactions={transactions}></MotionCards>
   
    </div>
}