"use client"
import { Button } from "@repo/ui/button";
import { Card1 } from "@repo/ui/card1";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { ChangeEvent, useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { createOnRamp } from "../actions/createOnRampTx";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];
export const AddMoney = ()=>{
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
                await createOnRamp(provider, value)
                    window.location.href = redirectUrl || "";
                } }  appName={""}>
            Add Money
            </Button>
        </div>
        </div>
    </Card1>
}