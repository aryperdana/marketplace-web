'use client'

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Confirmation: React.FC = () => {
  const searchParams = useSearchParams()
  const [otp, setOtp] = useState('');
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://metaderma.bithouse.id/api/customer/registration/otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: otp, email: searchParams?.get('id') }),
      });
      if (response.ok) {
        console.log('OTP verification successful');
        // Redirect to success page or perform further actions
      } else {
        console.error('OTP verification failed');
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-8">Registration Confirmation</h1>
      <div className="text-lg text-center">Your code was sent to you via email</div>
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
            Enter OTP
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="otp"
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Confirm
          </button>
        </div>
       
      </form>
    </div>
  );
};

export default Confirmation;