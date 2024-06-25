"use client";
import Image from "next/image";
import GlobalApi from "../_utils/GlobalApi";
import React, { useEffect, useState } from 'react';



function CategoryList() {


  const [typesRestaurantList, setTypesRestaurantList] = useState([]);

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


  return (
    <div className="h-screen">
      <div className="grid grid-cols-4 ">
        {typesRestaurantList && typesRestaurantList.map((types, index) => {
          return (
            <div className="flex" key={index}>
              
              <Image src={types.icon.url}
                alt={types.name}
                width={100}
                height={100}
              />
            </div>
          )
        }
        )
        }
      </div>
    </div>
  )
}

export default CategoryList;