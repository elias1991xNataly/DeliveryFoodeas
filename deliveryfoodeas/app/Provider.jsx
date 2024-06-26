import React from 'react';
import Header from "../app/_components/Header";

const Provider = ({ children }) => {
    return (
        <div className='relative'>
            <Header/>
            <div className='md:pl-10'>

            {children}
            </div>
        </div>
    )
}

export default Provider