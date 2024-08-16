"use client"
import { Button } from "@repo/ui/button";
import { Card1 } from "@repo/ui/card1"
import { TextInput } from "@repo/ui/textInput"
import { useEffect, useState } from "react"
import { ConfirmWithDrawl } from "../../../actions/confirmationWithdrawl";
import { offRampTx } from "../../../actions/createOffRampTx";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation'
import { useSession } from "next-auth/react";

export default()=>{
   
    const session = useSession();
    if(session.status==="unauthenticated"){
        return <div className="mt-20">
            You are not authenticated
        </div>
    }
    const router = useRouter();
    const params = useParams<{ amount:string}>();
    const [pass,SetPass]=useState("");
    useEffect(() => {
        // Check if the page was accessed directly
        if (document.referrer === '') {
          // Redirect to a safe page or show an error
          router.push('/dashboard');
        }
      }, [router]);
return <div className="w-[40%] mt-64  ml-[26rem]">
<Card1 title={"Are you sure"}>
    <div className="w-full">
    <TextInput type="password" label={"Password"} placeholder={"Password"} onChange={(val) => {
            SetPass((val))
}} />
<Button onClick={async () => {
               const response= await ConfirmWithDrawl(pass);
               if(response.message==="success"){
                const response= await offRampTx(Number(params.amount));
                console.log(response.token)
                if(response.message==="Done"){
                 const token = encodeURIComponent(response.token as string)
                 router.push(`http://localhost:3001/add/${response.txId}?token=${token}&amount=${params.amount}`)
                }
               }
                
                   
                } }  appName={""}>
            Add Money
            </Button>
    </div>
</Card1>
</div>

}