import prisma from "@repo/db/client";
import { ServerSessionMerchentUser } from "@repo/interfaces/interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Card1 } from "@repo/ui/card1";
import { OnRampStatus1 } from "@repo/db/enum";





async function getUserToMerchantTx(){
    const session:{user:ServerSessionMerchentUser}|null = await getServerSession(authOptions);
    const txns = await prisma.user2merchantTx.findMany({
        where: {
            toMerchantId: session?.user?.id as string
        },
        include:{
            fromUser:true,
            toMerchant:true
        }
        
    });
   return txns;
}

export default async function (){

const UserToMerchantTx= await getUserToMerchantTx()
    return <div className="w-full h-screen p-5">
     <div className="text-6xl text-[#5640d7] pt-20 md:pl-10  font-bold">
        Transactions
    </div>
    <div className="md:p-10 p-5">
    <Card1 title="Recent Transactions">
<div className="pt-2">
    {UserToMerchantTx?.map((t:any,index:any) => <div key={index}className="flex justify-between py-3">
        <div>
        
       <div className="text-md font-semibold">
                Received INR from {t.fromUser.name}
            </div>
        
            
            <div className="text-slate-600 text-xs">
                {t.timestamp.toDateString()}
            </div>

            <div className={`text-xs mt-1 font-semibold ${getStatusStyle(t.status)}`}>
                {t.status}
              </div>
            
        </div>
      
       <div className="flex flex-col justify-center">
            + Rs {t.amount / 100}
        </div>
      

       

    </div>)}
</div>
</Card1>
    </div>
    </div>
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