'use client'
import { logout } from '@/lib/action/user.action';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaHouse, FaInbox, FaBell, FaCompass, FaCircleInfo, FaGear, FaRightFromBracket } from "react-icons/fa6";
import Cookies from 'js-cookie';

const BottomNav = ({user}: BottomNavType) => {
    const router = useRouter();
    
    const handleProfileClick = () => {
        router.push(`/profile?id=${user.id}`);
    }

    const handleHomeClick = () => {
        router.push('/');
        router.refresh();
    }

    const handleMessages =  () => {
        router.push(`/messages?id=${user.id}`);
    }

    const handleLogout = () => {
        Cookies.remove('access_token');
        logout();
        router.push('/sign-in');
    }
  
    return (
        <div className="flex justify-between fixed bottom-0 w-full bg-white py-4 px-10  border border-black-400 md:hidden">
            
            <div onClick={handleHomeClick} className='flex items-center'>
                <FaHouse className='text-xl' />
            </div>

            <div onClick={handleMessages} className='flex items-center relative'>
                <FaInbox className='text-xl' />

                {/* notification dot */}
                <div className='h-2 w-2 rounded-full bg-amber-500 absolute bottom-2 left-3'></div>
            </div>

            <div className='flex items-center'>
                <FaBell className='text-xl' />
            </div>

            <div className='flex items-center'>
                <FaCircleInfo className='text-xl' />
            </div>

            {/* <div className='flex items-center'>
                <FaGear className='text-xl' />
            </div> */}

            <li onClick={handleLogout} className='flex items-center'>
                <FaRightFromBracket className='text-xl'/>
            </li>

            <div onClick={handleProfileClick} className='flex items-center'>
                <img  className="h-8 rounded-xl" src={user.profile_picture} alt="profile image"></img>
            </div>
            
        </div>
  )
}

export default BottomNav