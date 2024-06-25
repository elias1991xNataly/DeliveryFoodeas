import React from 'react';
import Header from "../app/_components/Header";

const Provider = ({ children }) => {
    return (
        <div>
            <Header/>
            {children}
        </div>
    )
}

export default Provider