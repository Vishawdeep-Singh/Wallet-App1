

import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "../../lib/auth";
import { ServerSessionUser } from "@repo/interfaces/interfaces";

export default async function Transactions() {
    const session:{user:ServerSessionUser} | null = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/signin')
    } 
    
    return <div>
        Hi
    </div>
}