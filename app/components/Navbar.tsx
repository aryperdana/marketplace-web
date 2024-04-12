'use client'

import Link from 'next/link'
import React, { useState } from 'react'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='bg-white border-b-2 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between sticky top-0 z-50'>
      <Link href='/' className='font-bold text-lg sm:text-2xl'>Sellerlist</Link>
      <div className='flex gap-4'>
        <Link href='/womenwears' className='text-gray-800 hover:text-gray-600'>Womenwears</Link>
        <Link href='/menwears' className='text-gray-800 hover:text-gray-600'>Menwears</Link>
        <Link href='/sale' className='text-gray-800 hover:text-gray-600'>Sale</Link>
      </div>
    </div>
  );
};
