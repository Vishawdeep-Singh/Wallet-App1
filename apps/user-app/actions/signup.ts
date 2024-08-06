"use server"

import db from "@repo/db/client"
import { SignUpType } from "@repo/zod-validation";
import { SignUpSchema } from "@repo/zod-validation";
import bcrypt from "bcrypt"
export async function signup(data:SignUpType) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
   
  try {

    const isvalid = SignUpSchema.safeParse(data);
if(!isvalid.success){
    
    return {
       
        errors: isvalid.error.flatten().fieldErrors,
      }
   
}

const isExist = await db.user.findUnique({
    where:{
        number:data.number,
        email:data.email
    }
})
if(isExist){
    return {
        Errormessage:"User already exist"
    }
}
const response = await db.user.create({
    data:{
        name:data.name,
        email:data.email,
        number:data.number,
        password:hashedPassword
    }
})
if(response){
    return {
        message:"Success"
    }
}
return {
    Errormessage: "Failed to create user",
  };

    
  } catch (error:any) {
    if(error.code){
        throw new Error(error.code)
    }
    else{
        throw new Error(error.message)
    }
    
  }
}