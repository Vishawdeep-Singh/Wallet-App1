"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";
import {ServerSession} from "@repo/interfaces/interfaces"

export async function p2pTransfer(to: string, amount: number) {
    const session:ServerSession | null = await getServerSession(authOptions);
    const from = session?.user?.id;
    

    if (!from) {
        return {
            message: "Error while sending OR You are not authenticated",
            status: "error",
        };
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to,
        },
    });

    if (!toUser) {
        return {
            message: "User not found",
            status: "error",
        };
    }

    try {
        await prisma.$transaction(async (tx:any) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: Number(from),
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
                    userId: Number(from),
                },
                data: {
                    amount: {
                        decrement: amount,
                    },
                },
            });

            await tx.balance.update({
                where: {
                    userId: Number(toUser.id),
                },
                data: {
                    amount: {
                        increment: amount,
                    },
                },
            });
            console.log("hello")

            const transfer = await tx.p2pTransfer.create({
                data: {
                  amount: amount,
                  fromUserId: Number(from),
                  toUserId: Number(toUser.id),
                  timestamp: new Date(),
                  
                },
              });
          
              

    
        });

    

      
        return {
            message: "Transfer completed successfully",
            status: "success",
        };

    } catch (error:any) {
        console.log(error);
        return {
        
            message: error.message || "An error occurred during the transaction",
            status: "error",
        };
    }
}
