'use client'
import React, { useState, useEffect } from "react";
import { Banner } from "./components/Banner";
import { Card } from "./components/Card";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { dummyData, Data } from './data'
import Modal from "./components/Modal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios';


const getProductData = async ({ name } : { name: string }): Promise<any> => {
  try {
    const response = await axios.get(`https://metaderma.bithouse.id/api/product/?level=OTC&name=${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
};

const getDetailProduct = async ({ id }: { id: string }): Promise<any> => {
  try {
    const response = await axios.get(`https://metaderma.bithouse.id/api/product/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isClient, setIsClient] = useState(false)
  const [loadingModal, setLoadingMOdal] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const [products, setProducts] = useState<any>([]);
  const [productDetail, setProdusctDetail] = useState<any>({});  
  const [loadingProduct, setLoadingProduct] = useState<boolean>(false)

  const convertToRupiah = (value: number): string => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    });
    return formatter.format(value);
  }

  

  async function fetchProductDetails(id: string) {
    setLoadingMOdal(true)

    try {
      const productDetails = await getDetailProduct({ id });
      setProdusctDetail(productDetails?.detail);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }

    setLoadingMOdal(false)
  } 
  
  useEffect(() => {
    const fetchData = async (name: string) => {
      setLoadingProduct(true)
      const data = await getProductData({ name });
      if (data) {
        setProducts(data);
        setIsClient(true)
        setLoadingProduct(false)
      }
    };

    fetchData(searchTerm);
  }, [searchTerm])

  
  
  return (
    <main className="min-h-screen">
      {
        isClient ? <>
        <Navbar />
        <div className="px-10 pt-5">
          <Banner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="my-8">
            <div className="text-lg font-semibold">listed Products</div>
            {loadingProduct ?
            <div className="flex items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin" style={{fontSize:50}} />
            </div> :
            <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
                {products?.detail?.map((val: any) => 
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
                        fetchProductDetails(val?.id)
                      }}
                    />
                  </>
                )}
              </div>
              }
          </div>
        </div>
        <Footer />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex gap-4">
            {loadingModal ? 'Memuat data...'
            : <>
              <img src={productDetail?.image} className="h-44"/>
              <div className="flex flex-col justify-between w-full">
                <div>
                  <div className="font-semibold text-lg">{productDetail?.name}</div>
                  <div className="text-sm mb-2">stock : {productDetail?.stock}</div>
                  <div>{convertToRupiah(productDetail?.price)}</div>
                </div>
                <button className="outline outline-black text-black rounded-md min-w-full py-1">Beli Sekarang</button>
              </div>
            </>
            }
          </div>
        </Modal>
        </> : 
          <div className="h-screen flex items-center justify-center">
            <AiOutlineLoading3Quarters className="animate-spin" style={{fontSize:50}} />
          </div>
      }
    </main>
  );
}

export default Home
