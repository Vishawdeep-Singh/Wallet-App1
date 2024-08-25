
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "../../lib/auth";
import QrCode from "../../../components/qrcodedisplay"
import { Suspense } from "react";
import Loading from "./loading";

export default async function Dashboard() {
    const session:any = await getServerSession(authOptions);
    if (!session?.user) {
        redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent('/dashboard')}`)
    } 
   
    
    return<div className="h-screen">
        <div className="text-4xl text-[#5640d7] mt-28 md:p-10 text-center font-bold">
            Hi ! {session.user?.name}
        </div>
    <div className="p-10 pl-20">
        <Suspense fallback={<Loading></Loading>}>
        <QrCode></QrCode>
        </Suspense>
    
    </div>
       
        
    </div>
}