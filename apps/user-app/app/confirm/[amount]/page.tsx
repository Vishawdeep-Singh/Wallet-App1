"use client"
import { Button } from "@repo/ui/button";
import { Card1 } from "@repo/ui/card1"
import { TextInput } from "@repo/ui/textInput"
import {  useState } from "react"
import { ConfirmWithDrawl } from "../../../actions/confirmationWithdrawl";
import { offRampTx } from "../../../actions/createOffRampTx";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import { toast, Bounce } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";

const LoadingOverlay: React.FC = () => {
    return (
      <Backdrop open={true} style={{ zIndex: 9999 }}>
         <CircularProgress color="inherit"  />
        <div className="flex flex-col items-center justify-center">
         
          <p className="mt-2 text-white">Redirecting you to Bank...</p>
        </div>
      </Backdrop>
    );
  };
export default()=>{
   
    const session = useSession();
    if(session.status==="unauthenticated"){
        return <div className="mt-20">
            You are not authenticated
        </div>
    }
    const router = useRouter();
    const params = useParams<{ amount:string}>();
    const [pass,SetPass]=useState("");
    const [loading,setLoading]=useState(false)
    
return <div className="md:w-[40%] mt-64 p-3 md:ml-[26rem]">
<Card1 title={"Are you sure"}>
    <div className="w-full">
    <TextInput type="password" label={"Password"} placeholder={"Password"} onChange={(val) => {
            SetPass((val))
}} />
<Button onClick={async () => {
                setLoading(true)
               const response= await ConfirmWithDrawl(pass);
               if(response.message==="success"){
                const response= await offRampTx(Number(params.amount));
                console.log(response.token)
                setLoading(false)
                if(response.message==="Done"){
                 const token = encodeURIComponent(response.token as string)
                 router.push(`http://vault.bank-app.vishawdeepsingh.in/add/${response.txId}?token=${token}&amount=${params.amount}`)
                }
                else{
                    toast.error(`${response.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                        });
                }
               }
               else{
                toast.error(`${response.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                    });
               }
                
                   
                } }  appName={""}>
         Confirm Withdrawl
            </Button>
    </div>
</Card1>
{loading && <LoadingOverlay></LoadingOverlay>}
</div>

}