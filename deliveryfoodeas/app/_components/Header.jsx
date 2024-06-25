"use client";
import { Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from "/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';


const Header = () => {

    const { user, isSignedIn } = useUser();

    return (
        <div className='flex justify-between items-center p-6 md:px-20 shadow-md'>
            <Image
                alt='logo'
                width={200}
                height={200}
                src="/Lifestyle_Food-Logo.wine.svg"
            />
            <div className='hidden md:flex border p-2 rounded-lg bg-gray-200 w-96'>
                <input type='text' className='bg-transparent w-full outline-none' />
                <Search />
            </div>

{isSignedIn?<UserButton/>:

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