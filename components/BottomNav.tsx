import React from 'react'
import { FaHouse, FaInbox, FaBell, FaCompass, FaCircleInfo, FaGear } from "react-icons/fa6";

const BottomNav = ({user}: BottomNavType) => {
  return (
    <div className="flex justify-between fixed bottom-0 w-full bg-white py-4 px-10  border border-black-400 md:hidden">
        
        <div className='flex items-center'>
            <FaHouse className='text-xl' />
        </div>

        <div className='flex items-center'>
            <FaInbox className='text-xl' />
        </div>

        <div className='flex items-center'>
            <FaBell className='text-xl' />
        </div>

        <div className='flex items-center'>
            <FaCircleInfo className='text-xl' />
        </div>

        <div className='flex items-center'>
            <FaGear className='text-xl' />
        </div>

        <div className='flex items-center'>
            <img  className="h-8 rounded-xl" src={user.profile_picture} alt="profile image"></img>
        </div>
        
    </div>
  )
}

export default BottomNav