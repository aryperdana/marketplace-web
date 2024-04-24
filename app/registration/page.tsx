'use client'
import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import Input from "../components/Input";
import { useRouter } from 'next/navigation';


const Registration = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirm: '',
        verification_page_url: 'https://metaderma.bithouse.id/verification',
      });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://metaderma.bithouse.id/api/customer/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push(`/confirmation/?prop=${formData?.email}`);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center px-10 pt-5">
        <div className="w-4/6">
            <div className="font-bold text-[30px] text-center my-3">Registration Customer</div>
            <hr />
            <form className="my-2" onSubmit={handleSubmit}>
                <Input name="email" label="Email" placeholder="Input email..." type="email" value={formData.email}  onChange={handleChange} />
                <Input name="password" label="Password" placeholder="Input password..." type="password" value={formData.password} onChange={handleChange} />
                <Input name="password_confirm" label="Password Confirmation" placeholder="Input password confirmation..." type='password' value={formData.password_confirm} onChange={handleChange} />
                <button type="submit" className="bg-black text-white rounded-md min-w-full py-3 my-2">Registration</button>
            </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Registration
