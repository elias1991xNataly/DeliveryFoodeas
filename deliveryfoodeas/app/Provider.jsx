"use client";
import React, { useState } from 'react';
import Header from "../app/_components/Header";
import { Toaster } from "/components/ui/sonner";
import { CartUpdateContext } from "./_context/CartUpdateContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import '@smastrom/react-rating/style.css';


const Provider = ({ children }) => {
    const [updateCart, setUpdateCart] = useState(0);
    const initialOptions = {
        'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        'currency':'EUR'
        
      };

    return (
        <PayPalScriptProvider options={ initialOptions }>

            <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>

                <div className='relative'>
                    <Header />
                    <Toaster />
                    <div className='md:px-10 mt-3 mb-20'>

                        {children}
                    </div>
                </div>
            </CartUpdateContext.Provider>
        </PayPalScriptProvider>
    )
}

export default Provider