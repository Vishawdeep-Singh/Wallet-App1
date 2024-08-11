"use client"
import { duration } from "@mui/material";
import { AddMoney } from "./addMoneycard"
import { Balance } from "./Balance"
import { OnRampTransactions } from "./onRampTransactions"
import {motion} from "framer-motion"
import  {OnRampStatus1} from "@repo/db/enum"
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
  interface TransactionFunctions {
   balance:Balance,
   transactions:OnRampTransaction[]
}


interface OnRampTransaction {
    time: Date;
    amount: number;
   status:  OnRampStatus1
    provider: string;
}
interface Balance {
    amount: number;
    locked: number;
}
export const  MotionCards=async({balance,transactions}:TransactionFunctions)=>{





   return <motion.div
  
    variants={container}
    initial="hidden"
    animate="visible"
    className="container grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
    <motion.div variants={item} className="item">
        <AddMoney />
    </motion.div>
    <motion.div variants={item} className="item">
        <Balance amount={balance.amount} locked={balance.locked}></Balance>
       
    </motion.div>
    <motion.div variants={item} className="item pt-4">
        <OnRampTransactions transactions={transactions}/>
      </motion.div>

    
    </motion.div>
}