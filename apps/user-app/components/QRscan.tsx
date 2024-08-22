"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { QrReader } from 'react-qr-reader';
import { toast, Bounce } from "react-toastify";

interface merchantDetails{
    id:string,
    name:string
  }

export const QRSCAN=()=>{
    const [cameraActive, setCameraActive] = useState<boolean>(true);
    const router = useRouter();
    console.log(cameraActive)

  // Effect to handle cleanup when the component unmounts
  useEffect(() => {
    // This effect runs when the component mounts
  
    
    // Cleanup function runs when the component unmounts
    return () => {
    
      setCameraActive(false); // Stops the QRReader from rendering
    };
  }, []);


  const handleScan = async (result: any) => {
    if (result) {
        try {
            const response = await fetch('http://localhost:3003/api/verifyToken', {
                method: 'POST', // Specify the HTTP method
                headers: {
                    'Content-Type': 'application/json', // Indicate the type of content being sent
                },
                body: JSON.stringify({
                    accessToken: `${result.text}`, // Replace with actual data
                }),
            });
            if (!response.ok) {
                // Parse the response JSON to get error details
                const errorData = await response.json();
                const errorMessage = errorData.error || `HTTP error! status: ${response.status}`;
                throw new Error(errorMessage);
            }
            const details:{
              merchantDetails:merchantDetails
            } = await response.json();
           router.push(`/paymentGateway/${details. merchantDetails.id}/${details.merchantDetails.name}`)
           
            
           
        } catch (error:any) {
          toast.error(`${error.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
            console.log('Fetch error:', error.message);
        }
    }
};

   
    return<div className="flex">

    <div className="text-4xl shrink-0 text-[#5640d7] pt-28 p-10 font-bold">
            QR Pay
        </div>
    <div className='w-[50%] h-[50%] shrink-0 m-32 '>
          {cameraActive && 
        <QrReader
          onResult={handleScan}
          constraints={{
            facingMode: 'user',
          }}
          videoId='video'
          className='border-4 w-full h-full border-black  rounded-lg'
          
          
        />
      }

    </div>
    </div> 
}