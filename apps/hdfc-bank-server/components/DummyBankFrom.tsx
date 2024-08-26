// components/CardForm.tsx
'use client';
import { useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, Bounce } from 'react-toastify';
export default function CardForm({
  tokenInfo,
  txId,
  token,
  amount,
}: {
  tokenInfo: any;
  txId: string;
  token: string;
  amount: string;
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error] = useState('');
  const router = useRouter();

  console.log(process.env.JWT_SECRET);

  return (
    <div className="md:max-w-md mx-auto p-4 w-[95%] mt-32 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1>Withdraw from bank</h1>
      <h2 className="text-xl font-semibold mb-4">Card Details</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="cardNumber"
        >
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="phone"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="123-456-7890"
          required
        />
      </div>
      <button
        onClick={async () => {
          const response = await axios.post(
            'https://bank-webhook.vishawdeepsingh29.workers.dev/hdfcWebhook',
            {
              paymentId: txId,
              user_identifier: tokenInfo.sub,
              token: token,
              amount: amount,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          if (response.data.message === 'Captured') {
            router.push('https://vault.user-app.vishawdeepsingh.in/transfer');
          } else {
            toast.error(`${response.data.message}`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
              transition: Bounce,
            });
          }
          console.log(token, tokenInfo, amount, txId);
        }}
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  );
}
