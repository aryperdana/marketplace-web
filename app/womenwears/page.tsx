'use client'
import React, { useState } from "react";
import { Banner } from "../components/Banner";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { womenDatas, Data } from '../data'
import Modal from "../components/Modal";
import Image from "next/image";
import image from '../../public/image/shirt.jpg'


const Womenwears = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Data[]>(womenDatas);

  const [isOpen, setIsOpen] = useState(false)
  const [dataItem, setDataItem] =  useState<Data>({
    id: 0,
    name: '',
    price: 0,
    disc: 0,
    image: '',
    category: ''
  });

  const convertToRupiah = (value: number): string => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    });
    return formatter.format(value);
  }


  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="px-10 pt-5">
        <Banner searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSearchResults={setSearchResults} searchResults={searchResults} image='url(image/women.jpg)' />
        <div className="my-8">
          <div className="text-lg font-semibold">listed Women Wears</div>
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
            {searchResults.slice(0, 10).map((val, ind) => 
              <>
                <Card
                  key={val?.id}
                  id={val?.id}
                  category={val?.category}
                  disc={val.disc}
                  image={val.image}
                  name={val?.name}
                  price={val?.price}
                  onClick={() => {
                    setIsOpen(true);
                    setDataItem(val);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex gap-4">
          <Image src={image} height={200} alt="test" />
          <div className="flex flex-col justify-between w-full">
            <div>
              <div className="font-semibold text-lg">{dataItem?.name}</div>
              <div className={`capitalize max-w-16 border ${dataItem.category === 'men' ? 'border-blue-500 text-blue-500' : 'border-red-500 text-red-500'} px-2 text-sm text-center rounded-xl my-2`}>{dataItem?.category}</div>
              <div>{convertToRupiah(dataItem.price)}</div>
            </div>
            <button className="outline outline-black text-black rounded-lg min-w-full py-1">Beli Sekarang</button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default Womenwears
