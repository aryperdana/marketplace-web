'use client'

import React from 'react'
import { IoSearch } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import { Data, dummyData } from '../data';

interface BannerProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchResults: Data[];
  setSearchResults: React.Dispatch<React.SetStateAction<Data[]>>;
  image: string;
}

export const Banner:React.FC<BannerProps> = ({ searchTerm, setSearchTerm, searchResults, setSearchResults, image }) => {

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const results = dummyData.filter((product: Data) => {
      return product.name.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm);
    });
    setSearchResults(results);
  };


  return (
    <div className='relative flex items-center justify-center h-96 min-w-full rounded-lg overflow-hidden'>
      <div className='absolute inset-0 w-full h-full bg-cover bg-center' style={{ backgroundImage: image }}>
        <div className='absolute inset-0 bg-black opacity-50'></div>
      </div>
      <div className='text-center relative z-10'>
        <div className='font-bold text-4xl text-white'>Change your wardrobe. Find exciting goods</div>
        <div className='my-8'>
          <div className="relative flex items-center mx-10">
            <input type="text" placeholder="What are you looking for?" className="w-full py-2 pl-10 pr-12 border rounded-full focus:outline-none focus:border-cyan-400" onChange={handleSearch} />
            <button className="absolute inset-y-0 right-0 px-3 py-2 bg-cyan-400 text-white rounded-full hover:bg-cyan-600 focus:outline-none"><IoArrowForward /></button>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <IoSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
