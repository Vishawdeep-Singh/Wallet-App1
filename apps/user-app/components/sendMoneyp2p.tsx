"use client"
import { Button } from "@repo/ui/button"
import { Card1 } from "@repo/ui/card1"
import { TextInput } from "@repo/ui/textInput"
import {motion} from "framer-motion"
import { useState } from "react"
import { p2pTransfer } from "../actions/p2pTransfer"
import { Bounce, toast } from "react-toastify"


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
export const SendMoneyp2p=()=>{
    const [number,Setnumber]=useState("");
    const [amount,Setamount]=useState(0);
return <motion.div
variants={container}
initial="hidden"
    animate="visible"

>
    <motion.div
    variants={item}
    >
    <Card1 title="Send">
        <TextInput type="number" label="Number" onChange={(value) => {
            Setnumber(value)
        } } placeholder={"To number you want to send"}></TextInput>
        <TextInput type="number" label="Amount" onChange={(value) => {
            Setamount(Number(value))
        } } placeholder={"Enter amount"}></TextInput>
        <Button onClick={async()=>{
            const response= await p2pTransfer(number, Number(amount) * 100);
            console.log(response)
            if (response.status === 'success') {
      console.log('Transfer successful:', response.message);
      toast.success(`🎉 ${response.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else if (response.status === 'error') {
      console.error('Transfer failed:', response.message);
      // Optionally show a toast for specific errors
      toast.error(`❌ ${response.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
           
        }}  appName={""} >Send</Button>
    </Card1>
    </motion.div>
  
</motion.div> 
}