"use client";

import { Button } from "@repo/ui/button"
import { Card1 } from "@repo/ui/card1"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"
import { UsertoMerchantPay } from "../actions/create_user_to_merchant_tx";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

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
router.push('/dashboard')
    }
}} appName="">Send Money</Button>
    </Card1>
</div>
}