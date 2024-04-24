import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { IoArrowForward } from 'react-icons/io5';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface BannerProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const Banner: React.FC<BannerProps> = ({ searchTerm, setSearchTerm }) => {
  const [loadingBanner, setLoadingBanner] = useState<boolean>(false)
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingBanner(true)
      try {
        const response = await axios.get('https://metaderma.bithouse.id/api/banner/?is_active=true');
        setBanners(response.data.detail);
        setLoadingBanner(false)
      } catch (error) {
        console.error('Error fetching banner data:', error);
        setLoadingBanner(false)
      }
    };
    fetchData();
  }, []);


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value;
    setSearchTerm(q);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return loadingBanner ?
  <div className="flex items-center justify-center">
    <AiOutlineLoading3Quarters className="animate-spin" style={{fontSize:50}} />
  </div>
   : (
    <div className="relative">
      <div className="slider-container h-10">
        <Slider {...settings}>
          {banners.map((banner: any) => (
            <div key={banner.id}>
              <img src={banner.image} alt={banner.name} className="slider-image" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-3/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center bg-white bg-opacity-80 rounded-full px-4 py-2 shadow-lg">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="bg-transparent border-none focus:outline-none flex-1"
            onChange={handleSearch}
          />
          <button className="text-white bg-blue-500 rounded-full p-2 ml-2">
            <IoArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};
