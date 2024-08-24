import { Card1 } from "@repo/ui/card1"

import  {OnRampStatus1} from "@repo/db/enum"
import { permanentRedirect, redirect } from "next/navigation"
import Link from "next/link"


export const OffRampTransactions=({transactions}:{
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: OnRampStatus1,
        provider: string
    }[]
})=>{

    if (!transactions.length) {
        return <Card1 title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card1>
    }
return <Card1 title="Recent Transactions">
<div className="pt-2">
    {transactions.slice(0,3).map((t,index) => <div key={index}className="flex justify-between py-3">
        <div>
            <div className="text-md font-semibold">
                Sent INR
            </div>
            <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
            </div>
            <div className="text-slate-600 text-xs">Provider: {t.provider}</div>
            <div className={`text-xs mt-1 font-semibold ${getStatusStyle(t.status)}`}>
                {t.status}
              </div>
        </div>
        <div className="flex flex-col justify-center">
            - Rs {t.amount / 100}
        </div>

    </div>)}
</div>
<Link className="hover:underline hover:cursor-pointer" href="/transactions">
    See More
</Link>
</Card1>
}
const getStatusStyle = (status: OnRampStatus1) => {
    switch (status) {
      case 'Success':
        return 'text-green-600';
      case 'Processing':
        return 'text-yellow-600';
      case 'Failure':
        return 'text-red-600';
      default:
        return 'text-slate-600';
    }
  };