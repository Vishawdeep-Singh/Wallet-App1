
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "../../lib/auth";
import { ServerSession } from "@repo/interfaces/interfaces";

export default async function Dashboard() {
    const session:ServerSession | null = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/signin')
    } 
    
    return<div>
        <div className="text-4xl text-[#5640d7] pt-28 p-10 font-bold">
            Hi ! {session.user?.name}
        </div>
    </div>
}