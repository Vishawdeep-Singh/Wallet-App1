"use client";

import { Button } from "@repo/ui/button"
import { Card1 } from "@repo/ui/card1"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"
import { UsertoMerchantPay } from "../actions/create_user_to_merchant_tx";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { Bounce, toast } from "react-toastify";

export const QRPAY=({id}:{id:string})=>{
    const router = useRouter()
    const [amount,setAmount]= useState(0);
    const [loading,setisLoading]=useState(false);
    if(loading){
        return <div>
            <ClipLoader></ClipLoader>
        </div>
    }
return <div>
    <Card1 title="Send Money">
<TextInput type="number" label="Amount" placeholder="Enter amount " onChange={(val)=>{
    setAmount(Number(val))
}}/>
<Button onClick={async()=>{
    setisLoading(true)
    const response = await UsertoMerchantPay(id,amount);
    setisLoading(false)
    if(response.status==="success"){
        toast.success(`${response.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
            setTimeout(() => {
                router.push('/dashboard');
            }, 3000); 
    }
    else if(response.status==="error"){
        toast.error(`${response.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }
}} appName="">Send Money</Button>
    </Card1>
</div>
}