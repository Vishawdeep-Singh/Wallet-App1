



import { SendMoneyp2p } from "../../../components/sendMoneyp2p";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { ServerSessionUser } from "@repo/interfaces/interfaces";
import { MotionP2PTx } from "../../../components/motionTxP2P";
import { Suspense } from "react";
import Loading from "./loading";





async function getP2PTx(){
    const session:{user:ServerSessionUser}|null = await getServerSession(authOptions);
    const txns = await prisma.user.findUnique({
        where: {
            id: Number(session?.user?.id)
        },
        select:{
            sentTransfers:{
                include:{
                    toUser:true,
                    fromUser:true
                }
            },
            receivedTransfers:{
                include:{
                    toUser:true,
                    fromUser:true
                }
            },

        }
        
    });
   return txns;
}

export  async function TxnsComponent() {
    
    const session:{
        user:ServerSessionUser
    }|null = await getServerSession(authOptions);
    const  txns  = await getP2PTx();
  
    const alltxns = txns?.sentTransfers.concat(txns.receivedTransfers);
    const sortedTxns = alltxns?.sort((a: any, b: any) => {
      const dateA = new Date(a.timestamp as string); // Assert timestamp is a string
      const dateB = new Date(b.timestamp as string);
      return dateB.getTime() - dateA.getTime();
    });
  
    return <MotionP2PTx session={session} sortedTxns={sortedTxns}></MotionP2PTx>;
  }




export default async function (){
    
   



    return <div className="w-screen h-screen flex md:flex-row flex-col items-center justify-evenly">
     <div className="md:w-[40%] w-[85%]">
        <SendMoneyp2p></SendMoneyp2p>
     </div>
            
            {/* <div className="w-[50%]">
            <Card1 title="Recent Transactions">
<div className="pt-2">
    {sortedTxns?.map((t,index) => <div key={index}className="flex justify-between py-3">
        <div>
        {t.fromUserId===Number(session?.user?.id) &&  <div className="text-md font-semibold">
               Sent INR TO
            </div>
        } 
        {t.toUserId===Number(session?.user?.id) &&  <div className="text-md font-semibold">
                Received INR
            </div>
        } 
            
            <div className="text-slate-600 text-xs">
                {t.timestamp.toDateString()}
            </div>
            
        </div>
        {t.fromUserId===Number(session?.user?.id) &&  <div className="flex flex-col justify-center">
            - Rs {t.amount / 100}
        </div>
        } 
        {t.toUserId===Number(session?.user?.id) &&  <div className="flex flex-col justify-center">
            + Rs {t.amount / 100}
        </div>
        } 

       

    </div>)}
</div>
</Card1>
            </div> */}
            <Suspense fallback={<Loading></Loading>}>
            <TxnsComponent></TxnsComponent>
            </Suspense>
           
        
    </div>
}