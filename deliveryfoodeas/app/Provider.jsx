"use client";
import React, { useState } from 'react';
import Header from "../app/_components/Header";
import { Toaster } from "/components/ui/sonner";
import { CartUpdateContext } from "./_context/CartUpdateContext"


const Provider = ({ children }) => {
    const [updateCart, setUpdateCart] = useState();


    return (
        <CartUpdateContext.Provider value={{updateCart, setUpdateCart}}>

            <div className='relative'>
                <Header />
                <Toaster />
                <div className='md:px-10'>

                    {children}
                </div>
            </div>
        </CartUpdateContext.Provider>
    )
}

export default Provider