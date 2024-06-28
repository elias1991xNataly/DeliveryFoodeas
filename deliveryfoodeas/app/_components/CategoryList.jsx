"use client";
import Image from "next/image";
import GlobalApi from "../_utils/GlobalApi";
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";



function CategoryList() {

  const listRef = useRef(null);
  const [typesRestaurantList, setTypesRestaurantList] = useState([]);
  const params = useSearchParams();
const[selectedCategory,setSelectedCategory]=useState('all');


  useEffect(() => {
    setSelectedCategory(params.get('category'));
  }, [params])


  useEffect(() => {
    getCategoryList();
  }, [])


  /**
   * Used to get Category List
   */
  const getCategoryList = () => {
    GlobalApi.GetCategory().then(resp => {
      console.log(resp.categories)
      setTypesRestaurantList(resp.categories)
    })
  };
  const ScrollRightHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      })
    }
  };

  return (
    <div className="relative mt-10 ">
      <div className="flex gap-4 overflow-auto scrollbar-hide max-w-screen" ref={listRef}>
        {typesRestaurantList && typesRestaurantList.map((types, index) => {
          return (
            <Link href={'?category=' + types.slug} className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:border-red-500 hover:bg-orange-50 cursor-pointer group ${selectedCategory==types.slug&&'text-red-500 border-red-500 bg-orange-50'}`} key={index}>

              <Image
                src={types.icon.url}
                alt={types.name}
                width={80}
                height={80}
                className="group-hover:scale-105 rounded-lg h-20 object-cover  transition-all duration-200"
              />
              <h2 className=' text-sm font-medium group-hover:text-red-500'>{types.name}</h2>
            </Link>
          )
        }
        )
        }
      </div>
      <ArrowRightCircle onClick={() => ScrollRightHandler()} className="absolute right-10 top-48 bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer"
      />
    </div>
  )
}

export default CategoryList;