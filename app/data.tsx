
'use client'

import image from '../public/image/shirt.jpg'

export interface Data {
    id: number;
    name: string;
    category: string;
    price: number;
    disc: number;
    image: any;
  }

export const generateDummyData = (count: number): Data[] => {
    const dummyDatas: Data[] = [];
    const categorys: string[] = ["women", "men"];
    const disc: number[] = [0, 10, 20, 30, 40, 50];

    for (let i = 1; i <= count; i++) {
      const randomCategoryIndex = Math.floor(Math.random() * categorys.length);
      const randomCategory = categorys[randomCategoryIndex];

      const randomDiscIndex = Math.floor(Math.random() * disc.length);
      const randomDisc = disc[randomDiscIndex];
      

      dummyDatas.push({
        id: i,
        name: `Data ${i}`,
        category : randomCategory,
        price: i * 20000,
        disc: randomDisc,
        image: image,
      });
    }
    
    return dummyDatas;
  };


  export const dummyData: Data[] = generateDummyData(20);

  export const womenDatas: Data[] = dummyData.filter(val => val.category === 'women')
  export const menDatas: Data[] = dummyData.filter(val => val.category === 'men')
  export const saleDatas: Data[] = dummyData.filter(val => val.disc > 0)
