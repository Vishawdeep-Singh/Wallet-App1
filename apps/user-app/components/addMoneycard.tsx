"use client"
import { Button } from "@repo/ui/button";
import { Card1 } from "@repo/ui/card1";

import { Select } from "@repo/ui/select";
import {  useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { createOnRamp } from "../actions/createOnRampTx";
import { useRouter } from 'next/navigation'
import { Bounce, toast } from "react-toastify";

const SUPPORTED_BANKS = [{
    name: "Dummy Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Dummy Bank 1",
    redirectUrl: "https://www.axisbank.com/"
}];
export const AddMoney = ()=>{
    const router = useRouter()
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider,setProvider]=useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)


    return <Card1 title="Add Money">
        <div className="w-full">
        <TextInput type="number" label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setValue(Number(val))
}} />
 <div className="py-4 text-left">
            Bank
        </div>



        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
               const response= await createOnRamp(provider, value)
               console.log(response.token)
               if(response.message==="Done"){
                const token = encodeURIComponent(response.token as string)
                router.push(`http://localhost:3001/bank/${response.txId}?token=${token}&amount=${value}`)
               }
               else{
                toast.error(`${response.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                    });
               }
                   
                } }  appName={""}>
            Add Money
            </Button>
        </div>
        </div>
    </Card1>
}