"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";


export async function  createOnRamp(provider:string,amount:number){
const session = await getServerSession(authOptions);

if(!session?.user || !session.user?.id){
    return {
        message:"Unauthenticated Request"
    }
}

const token = (Math.random() * 1000).toString();
await prisma.onRampTransaction.create({
    data:{
        provider,
        status:"Processing",
        startTime:new Date(),
        amount:Number(amount),
        userId:Number(session?.user?.id),
        token:token,

    }
})

return {
    message: "Done"
}



}