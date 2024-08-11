/**
 * v0 by Vercel.
 * @see https://v0.dev/t/p5BBgRy2c7g
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@repo/ui/card"
import  Label  from "@repo/ui/label"
import  Input  from "@repo/ui/input"
import { Button } from "@repo/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import bcrypt from "bcrypt";
import {SignUpType} from "@repo/zod-validation"
import { signup } from "../../actions/signup"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { useRouter } from "next/navigation";
import { Appbar } from "@repo/ui/appbar"



export default function SignUpComponent() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignUpType>({
    name:'',
    email:" ",
    number:"",
    password:" "
   
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function SignUpHandler(){
    try{
      const response =await signup(formData);
     if(response?.message==="Success"){
       router.push('/signin')
     }
     else if(response?.Errormessage){
       toast.error(response?.Errormessage, {
         position: "top-right",
         autoClose: 20000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         transition: Bounce,
         });
     }
     else{
      const errors = response?.errors;
      const mappedErrors = Object.entries(errors!).map(([key, messages]) => {
       return `${messages.join(', ')}`;
     });
     mappedErrors.map((err)=>{
       toast.error(err, {
         position: "top-right",
         autoClose: 20000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         transition: Bounce,
         });
     })
     }
  
  
     }
     catch(err:any){
       if(err.message==="P2002"){
         toast.error("User already exists", {
           position: "top-right",
           autoClose: 20000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
           transition: Bounce,
           });
       }
       else{
         toast.error(err.message, {
           position: "top-right",
           autoClose: 20000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
           transition: Bounce,
           });
       }
       
     }
  }

 
  return (
    <><div className=" bg-[#faf3f4] flex min-h-screen flex-col">

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-8 mt-20 sm:px-8 md:px-10">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <motion.h1 initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }} className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Secure Your Currency Assets
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} className="text-lg pt-10 text-muted-foreground">
              Experience the ultimate in digital asset protection with our cutting-edge currency wallet.
            </motion.p>
          </div>
          <Card className="w-full" title={""} href={""}>
            <CardHeader>
              <CardTitle>Create Your Account</CardTitle>
              <CardDescription>Sign up to start managing your currency securely.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input onChange={handleInputChange} name="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Email</Label>
                <Input onChange={handleInputChange} name="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Phone Number</Label>
                <Input onChange={handleInputChange} name="number" type="number" placeholder="Enter your Phone Number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input onChange={handleInputChange} name="password" type="password" placeholder="Enter your password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={SignUpHandler} appName={""}>Sign Up</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="bg-[#1c1c1c] px-6 py-4 text-center text-sm text-muted-foreground sm:px-8 md:px-10">
        &copy; 2024 Currency Wallet. All rights reserved.
      </footer>
    </div></>
  )
}

function DollarSignIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

