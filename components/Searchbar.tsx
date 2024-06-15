'use client'
import React, { useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";

const Searchbar = () => {
    const[focus, setFocus] = useState('');

    const handleFocus = () => {
        setFocus('border-black');
    }

    const handleBlur = () => {
        setFocus('');
    }

    return (
        <div className={`w-full flex border border-gray-500 items-center p-2 rounded-md  duration-500 ${focus}`}>
            <FaMagnifyingGlass className='text-gray-600 mr-2' />
            <input onFocus={handleFocus} onBlur={handleBlur} type='text' placeholder='Search' className='w-full focus:outline-none'></input>
        </div>
    )
}

export default Searchbar