"use client"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
export const TransactionButtons=()=>{
    const router = useRouter()
    const pathname = usePathname();

    return <div className="flex md:p-10 p-5 space-x-6 ">
        <motion.button
       
        onClick={()=>{
            router.push("http://localhost:3000/transactions")
        }}
          className={` hover:cursor-pointer  ${pathname==='/transactions' ? 'rounded-3xl text-sm shadow-lg bg-white p-2 md:px-4 px-2 font-bold hover:scale-125 transition ease-in-out delay-50 text-black scale-110' :'text-slate-500 font-semibold scale-90'} `}  >Bank Transactions</motion.button>
        <motion.button
        onClick={()=>{
            router.push("http://localhost:3000//transactions/p2p")
        }}
       
            
            
          className={`hover:cursor-pointer  ${pathname==='/transactions/p2p' ? 'rounded-3xl text-sm shadow-lg bg-white p-2 md:px-4 px-2 font-bold hover:scale-125 transition ease-in-out delay-50 text-black scale-110' :'text-slate-500  font-semibold scale-90 '} `}>P2P Transactions</motion.button>
        <motion.button
        onClick={()=>{
            router.push("http://localhost:3000/transactions/QR")
        }}
       
            
            
          className={`hover:cursor-pointer  ${pathname==='/transactions/QR' ? 'rounded-3xl text-sm shadow-lg bg-white p-2 md:px-4 px-2 font-bold hover:scale-125 transition ease-in-out delay-50 text-black scale-110' :'text-slate-500  font-semibold scale-90 '} `}>QR Transactions</motion.button>
    </div>
}