
import { Button } from "@repo/ui/button";
import { Card1 } from "@repo/ui/card1";
import { TextInput } from "@repo/ui/textInput";
import { SendMoneyp2p } from "../../../components/sendMoneyp2p";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";





async function getP2PTx(){
    const session = await getServerSession(authOptions);
    const txns = await prisma.user.findUnique({
        where: {
            id: Number(session?.user?.id)
        },
        select:{
            sentTransfers:true,
            receivedTransfers:true
        }
        
    });
   return txns;
}





export default async function (){
    
    const txs=await getP2PTx();
    const session = await getServerSession(authOptions);
   const alltxns=  txs?.sentTransfers.concat(txs.receivedTransfers);
   const sortedTxns = alltxns?.sort((a:any, b:any) => {
    // Convert timestamps to Date objects and compare
    const dateA = new Date(a.timestamp as string); // Assert timestamp is a string
    const dateB = new Date(b.timestamp as string); 
    return dateB.getTime() - dateA.getTime();
  });
  console.log(alltxns)


    return <div className="w-screen h-screen flex items-center justify-evenly">
     <div className="w-[40%]">
        <SendMoneyp2p></SendMoneyp2p>
     </div>
            
            <div className="w-[50%]">
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
            </div>
        
    </div>
}