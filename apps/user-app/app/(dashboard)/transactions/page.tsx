

import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "../../lib/auth";

export default async function Transactions() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/signin')
    } 
    
    return <div>
        Hi
    </div>
}