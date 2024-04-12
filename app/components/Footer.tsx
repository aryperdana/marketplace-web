'use client'

import React from 'react'
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";

export const Footer = () => {
    return (
      <footer className="bg-[#F9F9F9] text-black p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="mb-4">
              <h2 className="text-xl md:text-xl font-semibold">Contact Us</h2>
              <p className="mt-2">Email: sellerlist@gmail.com</p>
              <p>Phone: +1234567890</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl md:text-xl font-semibold">Follow Us</h2>
              <div className="flex mt-2">
                <a href="https://web.facebook.com/?locale=id_ID&_rdc=1&_rdr" className="mr-4"><AiFillFacebook className='text-2xl' /></a>
                <a href="https://twitter.com/?lang=id" className="mr-4"><BsTwitterX className='text-2xl' /></a>
                <a href="https://www.instagram.com/"><AiFillInstagram className='text-2xl' /></a>
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-xl font-semibold">Subscribe to Newsletter</h2>
              <div className="mt-2 flex flex-col md:flex-row items-center">
                <input type="email" placeholder="Enter your email" className="w-full md:w-auto px-4 py-2 rounded-l-lg mb-2 md:mb-0 md:mr-2 focus:outline-none focus:ring focus:border-blue-300" />
                <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">Subscribe</button>
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-200" />
          <p className="text-center text-sm">&copy; 2024 Marketplace. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  