"use client";
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export const TransferButtons=()=>{
const router = useRouter()
    const pathname = usePathname();

    
   return <div className="flex p-10 space-x-6 ">
        <motion.button
       
        onClick={()=>{
            router.push("/transfer")
        }}
          className={` hover:cursor-pointer  ${pathname==='/transfer' ? 'rounded-3xl text-sm shadow-lg bg-white p-2 px-4 font-bold hover:scale-125 transition ease-in-out delay-50 text-black scale-110' :'text-slate-500 font-semibold scale-90'} `}  >Deposit</motion.button>
        <motion.button
        onClick={()=>{
            router.push("/transfer/withdraw")
        }}
       
            
            
          className={`hover:cursor-pointer  ${pathname==='/transfer/withdraw' ? 'rounded-3xl text-sm shadow-lg bg-white p-2 px-4 font-bold hover:scale-125 transition ease-in-out delay-50 text-black scale-110' :'text-slate-500  font-semibold scale-90 '} `}>Withdraw</motion.button>
    </div>
}