

import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "../../lib/auth";
import { ServerSession } from "@repo/interfaces/interfaces";

export default async function Transactions() {
    const session:ServerSession | null = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/signin')
    } 
    
    return <div>
        Hi
    </div>
}