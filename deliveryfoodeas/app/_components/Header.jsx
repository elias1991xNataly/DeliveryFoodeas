"use client";
import { Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from "/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { CartUpdateContext } from '../_context/CartUpdateContext';
import GlobalApi from '../_utils/GlobalApi';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "/components/ui/popover";
import Cart from "./Cart";
import Link from 'next/link';



const Header = (item) => {
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
    const { user, isSignedIn } = useUser();
    const [cart, setCart] = useState([]);
    useEffect(() => {
        setUpdateCart(true);

        user && GetUserCart();
    }, [updateCart && user]);

    const GetUserCart = () => {
        GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(resp => {


            setCart(resp?.userCarts)
        })
    }



        ;
    return (
        <div className='flex justify-between items-center p-6 md:px-20 shadow-md'>
            <Link href={'/'}>
            <Image
                alt='logo'
                width={200}
                height={200}
                src="/Lifestyle_Food-Logo.wine.svg"
                className='h-auto'
            />
            </Link>
            <div className='hidden md:flex border p-2 rounded-lg bg-gray-200 w-96'>
                <input type='text' className='bg-transparent w-full outline-none' />
                <Search />
            </div>

            {isSignedIn ?
                <div className='flex gap-3 items-center'>

                    <Popover>
                        <PopoverTrigger asChild>
                            <div className='flex gap-2 items-center cursor-pointer'>

                                <ShoppingCart />
                                <label className='p-1 px-3 rounded-full bg-slate-200'>
                                    {cart?.length}
                                </label>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-full">
                            <Cart cart={cart} />
                        </PopoverContent>
                    </Popover>

                    <UserButton />
                </div>

                :

                <div className='flex gap-5'>
                    <SignInButton mode='modal'>

                        <Button variant="outline" >Login</Button>
                    </SignInButton>

                    <SignUpButton mode='modal'>

                        <Button variant="own">Sign Up</Button>
                    </SignUpButton>
                </div>

            }

        </div>
    )
}

export default Header