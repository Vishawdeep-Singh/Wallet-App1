import { Card1 } from "@repo/ui/card1"





export const Balance=({amount,locked}:{
    amount:number,
    locked:number
})=>{





    return <Card1 title={"Balance"}>
        <div className="flex justify-between border-b text-gray-500 mt-5 text-sm font-semibold border-slate-300 pb-2">
            <div>
                Unlocked balance
            </div>
            <div>
            {amount/100} INR
            </div>
        </div>
        <div className="flex justify-between border-b text-gray-500 text-sm font-semibold border-slate-300 py-2">
            <div>
                Total Locked Balance
            </div>
            <div>
                {locked / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b text-gray-500 text-sm font-semibold border-slate-300 py-2">
            <div>
                Total Balance
            </div>
            <div>
                {(locked+amount)/100} INR
            </div>
        </div>
    </Card1>
}