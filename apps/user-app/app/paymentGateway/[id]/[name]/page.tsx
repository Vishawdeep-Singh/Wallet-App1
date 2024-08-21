import { ServerSessionMerchentUser } from "@repo/interfaces/interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { QRPAY } from "../../../../components/qrPay";
import prisma from "@repo/db/client";

async function checkIdValid(id:string){

    try {
        const response =await prisma.merchant.findUnique({
            where:{
                id:id
            }
        })
        return response;
    } catch (error:any) {
        return {
            message:"Error in finding id of merchant"+"    "+error.message
        }
    }

}

export default async function PaymentGateway({params}:{params:{id:string,name:string}}){
    const session:{
        user:ServerSessionMerchentUser 
    } |  null = await getServerSession(authOptions);

    if(!session?.user || !session.user?.id){
        return {
            message:"Unauthenticated Request",
            token:null
        }
    }

    const isValid = await checkIdValid(params.id);
    if(isValid===null){
        return <div>
            Invalid Id
        </div>
    }




    return <div className="flex flex-col items-center h-full w-full]">
       <div className="text-4xl text-[#5640d7] pt-28 p-10 font-bold mt-28">
            Payment to Mr. <span className="text-black">{decodeURIComponent(params.name)}</span> 
        </div>
        <div className="w-[30%] mt-20">
            <QRPAY id={params.id}></QRPAY>
        </div>
    </div>
}