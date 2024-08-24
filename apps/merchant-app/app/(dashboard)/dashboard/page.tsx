
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "../../lib/auth";
import { ServerSessionUser } from "@repo/interfaces/interfaces";
import QRCode from "react-qr-code";
import { generateToken } from "../../../actions/generateToken";
import QrCode from "../../../components/qrcodedisplay"

export default async function Dashboard() {
    const session:any = await getServerSession(authOptions);
    if (!session?.user) {
        redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent('http://localhost:3003/dashboard')}`)
    } 
   
    
    return<div className="h-screen">
        <div className="text-4xl text-[#5640d7] pt-28 md:p-10 text-center font-bold">
            Hi ! {session.user?.name}
        </div>
    <div className="p-10 pl-20">
    <QrCode></QrCode>
    </div>
       
        
    </div>
}