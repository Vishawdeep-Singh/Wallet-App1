"use client"
import QRCode from "react-qr-code";
import { generateToken } from "../actions/generateToken";
import { useEffect, useState } from "react";

export default  function(){
const [data,setdata]=useState<string | null>(null);
const [error,setError]=useState<string | null>(null);
useEffect(() => {
    // Define the async function inside useEffect
    const fetchToken = async () => {
      try {
       
        const response = await generateToken()
        // Check if the response is successful
        if (response.message === 'success') {
          setdata(response.token);
        } else {
          // Handle cases where response is not successful
          setError(response.message);
        }
      } catch (err) {
        // Handle unexpected errors (e.g., network issues)
        setError('An unexpected error occurred.');
        console.error('Error fetching token:', err);
      }
    };

    // Call the async function
    fetchToken();
  }, []); // Empty dependency array means this runs only once on mount
if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

return <div>
     <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "50%", width: "50%" }}
    value={data ?? "null"}
    viewBox={`0 0 256 256`}
  />
</div>
}