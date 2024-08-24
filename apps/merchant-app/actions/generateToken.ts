"use server"


import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import  {ServerSessionMerchentUser} from "@repo/interfaces/interfaces"
import jwt from "jsonwebtoken"


export const  generateToken=async ()=>{
try {
    const session:{
        user:ServerSessionMerchentUser 
    } |  null = await getServerSession(authOptions);

    if(!session?.user || !session.user?.id){
        return {
            message:"Unauthenticated Request",
            token:null
        }
    }
    const payload={
        id:session.user.id,
        name:session.user.name
    } 
    const token =  await jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:"10m"})
    return {
        message:"success",
        token:token 
    }
} catch (error) {
    if (error instanceof Error) {
        return { message: `An error occurred: ${error.message}
        ` , token:null };
      } else {
        return { message: 'An unknown error occurred in creating token for qr code', token:null };
      }
}
}