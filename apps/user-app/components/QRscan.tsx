'use client';

import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { QrReader } from 'react-qr-reader';
import { toast, Bounce } from 'react-toastify';

interface merchantDetails {
  id: string;
  name: string;
}
const LoadingOverlay: React.FC = () => {
  return (
    <Backdrop open={true} style={{ zIndex: 9999 }}>
      <CircularProgress color="inherit" />
      <div className="flex flex-col items-center justify-center">
        <p className="mt-2 text-white">Processing QR...</p>
      </div>
    </Backdrop>
  );
};
export const QRSCAN = () => {
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(cameraActive);

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
        setLoading(true);
        const response = await axios.post(
          'https://vault.merchant-app.vishawdeepsingh.in/api/verifyToken',
          {
            accessToken: `${result.text}`, // Replace with actual data
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setLoading(false);
        // Check if the response is okay
        if (response.status === 200) {
          const details = response.data;
          router.push(
            `/paymentGateway/${details.merchantDetails.id}/${details.merchantDetails.name}`
          );
        }
      } catch (error: any) {
        let errorMessage = 'An unknown error occurred';

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage =
            error.response.data.error ||
            `HTTP error! status: ${error.response.status}`;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = 'No response received from server';
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }

        toast.error(`${errorMessage}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });

        console.log('Fetch error:', errorMessage);
      }
    }
  };

  return (
    <div className="flex md:flex-row flex-col">
      <div className="text-4xl shrink-0 text-[#5640d7] pt-28 p-10 font-bold">
        QR Pay
      </div>
      <div className="w-[50%] h-[50%] shrink-0 md:m-32 ml-10 ">
        {cameraActive && (
          <QrReader
            onResult={handleScan}
            constraints={{
              facingMode: 'user',
            }}
            videoId="video"
            className="border-4 w-full h-full border-black  rounded-lg"
          />
        )}
      </div>
      {loading && <LoadingOverlay />}
    </div>
  );
};
