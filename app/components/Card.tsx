'use client'

import React from 'react'
import { Data } from '../data'


interface CardProps extends Data {
    onClick?: () => void;
  }

export const Card: React.FC<CardProps> = ({ id, price, category, disc, image, name, onClick }) => {
    const convertToRupiah = (value: number): string => {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    }

    
    return (
      <div className='h-70 min-w-full rounded-xl my-4 shadow-xl cursor-pointer' onClick={onClick}>
        <img src={image} alt='foto' className='w-full h-2/3 rounded-t-xl' />
        <div className='flex justify-between my-4 mx-3 text-sm'>
          <div>
            <div>{name}</div>
            {disc > 0 && <div className='text-red-400'>{disc}% off</div>}
          </div>
          <div>
            <div className={disc > 0 ? 'line-through' : ''}>{convertToRupiah(price)}</div>
            {disc > 0 && <div className='text-red-400'>{convertToRupiah(price)}</div>}
          </div>
        </div>
      </div>
    )
  }
