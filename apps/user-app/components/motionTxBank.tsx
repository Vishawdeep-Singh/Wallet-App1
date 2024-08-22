"use client"
import { OnRampStatus1 } from "@repo/db/enum";
import { Card1 } from "@repo/ui/card1"
import { motion } from "framer-motion"
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        
      }
    }
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
        export const MotionTxBank=({OffRampsortedTxns,OnRampsortedTxns}:any)=>{
return<motion.div
variants={container}
    initial="hidden"
    animate="visible"
 className="grid grid-cols-2 gap-4">
            <motion.div variants={item}>
            <Card1 title="Credited">
      <div className="pt-2">
            {OnRampsortedTxns.map((tx:any,index:any)=>{
           
                
                
                
                return<div key={index} className="flex justify-between py-3">
                <div>
                

           <div className="text-md font-semibold">
                Received INR
            </div>
               

            <div className="text-slate-600 text-xs">
                {tx.startTime.toDateString()}
            </div>
            <div className="text-slate-600 text-xs">Provider: {tx.provider}</div>
            <div className={`text-xs mt-1 font-semibold ${getStatusStyle(tx.status)}`}>
                {tx.status}
              </div>
                </div>

              
                    
           <div className="flex flex-col justify-center">
                    + Rs {tx.amount / 100}
            </div>
            



                </div>}) }
      </div>
            </Card1>
            </motion.div>
            <motion.div variants={item}>
            <Card1 title="Withdrawled">
      <div className="pt-2">
            {OffRampsortedTxns.map((tx:any,index:any)=>{
           
                
                
                
                return<div key={index} className="flex justify-between py-3">
                <div>
                

           <div className="text-md font-semibold">
                Sent INR
            </div>
               

            <div className="text-slate-600 text-xs">
                {tx.startTime.toDateString()}
            </div>
            <div className="text-slate-600 text-xs">Provider: {tx.provider}</div>
            <div className={`text-xs mt-1 font-semibold ${getStatusStyle(tx.status)}`}>
                {tx.status}
              </div>
                </div>

              
                    
           
           <div className="flex flex-col justify-center">
                - Rs {tx.amount / 100}
            </div>



                </div>}) }
      </div>
            </Card1>
            </motion.div>
         
          
        </motion.div>
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