"use client"
import { Card1 } from "@repo/ui/card1"
import { motion } from "framer-motion"
const container = {
    hidden: { opacity: 1, scale: 0,y:20 },
    visible: {
      opacity: 1,
      scale: 1,
      y:0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        
      }
    }
  };
export const MotionP2PTx=({sortedTxns,session}:any)=>{
   return  <motion.div 
   variants={container}
    initial="hidden"
    animate="visible"
   className="w-[50%]">
            <Card1 title="Recent Transactions">
<div className="pt-2">
    {sortedTxns?.map((t:any,index:any) => <div key={index}className="flex justify-between py-3">
        <div>
        {t.fromUserId===Number(session?.user?.id) &&  <div className="text-md font-semibold">
               Sent INR TO {t.toUser.name}
            </div>
        } 
        {t.toUserId===Number(session?.user?.id) &&  <div className="text-md font-semibold">
                Received INR from {t.fromUser.name}
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
            </motion.div>
}