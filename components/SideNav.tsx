'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaHouse, FaInbox, FaBell, FaCompass, FaCircleInfo, FaGear, FaRightFromBracket } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { showErrorToast } from '@/lib/toast';
import instance from '@/lib/axiosConfig';

const SideNav = ({ user }: SideNavTpye) => {
    const router = useRouter();
    
    const handleProfileClick = () => {
        router.push(`/profile?id=${user.id}`);
    }

    const handleHomeClick = () => {
        router.push('/');
        router.refresh();
    }

    const handleLogout = async() => {
        try {
            const response = await instance.post('logout');

            router.push('sign-in');
        } catch (err) {
            console.error('Error logging out: ', err);
            showErrorToast('Problem logging out. Please try again later');
        }
    }

    const handleMessages = () => {
        router.push(`/messages?id=${user.id}`);
    }

  return (
    <div className="py-16 h-screen fixed border border-black-400 bg-white xl:px-5 w-24 xl:w-80 hidden md:block">
        
        <div className='w-full flex justify-center'>
            <img className='h-10 xl:h-32 mb-10' src="./logo.png" alt="logo"></img>
        </div>

        <ul>
            <li onClick={handleHomeClick} className='flex w-full px-5 py-2 rounded-md hover:bg-gray-200 duration-500 cursor-pointer justify-center xl:justify-normal'>
                <FaHouse className='text-2xl xl:text-2xl xl:mr-5'/>
                <p className="hidden xl:block">HOME</p>
            </li>

            <li onClick={handleMessages} className='flex relative w-full px-5 py-2 rounded-md hover:bg-gray-200 duration-500 cursor-pointer justify-center xl:justify-normal'>
                <FaInbox className='text-2xl xl:text-2xl xl:mr-5'/>
                <p className="hidden xl:block">MESSAGES</p>

                {/* notification dot */}
                <div className='h-2 w-2 rounded-full bg-amber-500 absolute bottom-2 left-14 xl:left-10'></div>
            </li>

            <li className='flex w-full px-5 py-2 rounded-md hover:bg-gray-200 duration-500 cursor-pointer justify-center xl:justify-normal'>
                <FaBell className='text-2xl xl:text-2xl xl:mr-5'/>
                <p className="hidden xl:block">NOTIFICATIONS</p>
            </li>

            <li className='flex w-full px-5 py-2 rounded-md hover:bg-gray-200 duration-500 cursor-pointer justify-center xl:justify-normal'>
                <FaCompass className='text-2xl xl:text-2xl xl:mr-5'/>
                <p className="hidden xl:block">EXPLORE</p>
            </li>

            <li className='flex w-full px-5 py-2 rounded-md hover:bg-gray-200 duration-500 cursor-pointer justify-center xl:justify-normal'>
                <FaCircleInfo className='text-2xl xl:text-2xl xl:mr-5'/>
                <p className="hidden xl:block">ABOUT</p>
            </li>

            <li className='flex w-full px-5 py-2 rounded-md hover:bg-gray-200 duration-500 cursor-pointer justify-center xl:justify-normal'>
                <FaGear className='text-2xl xl:text-2xl xl:mr-5'/>
                <p className="hidden xl:block">SETTINGS</p>
            </li>

            <li onClick={handleLogout} className='flex w-full px-5 py-2 rounded-md hover:bg-gray-200 duration-500 cursor-pointer justify-center xl:justify-normal'>
                <FaRightFromBracket className='text-2xl xl:text-2xl xl:mr-5'/>
                <p className="hidden xl:block">LOGOUT</p>
            </li>

            <li onClick={handleProfileClick} className='flex w-full px-5 py-2 rounded-md hover:bg-gray-200 duration-500 cursor-pointer justify-center xl:justify-normal'>
                <img  className="h-8 rounded-full mr-2" src={user.profile_picture} alt="profile image"></img>
                <p className="hidden xl:flex items-center">PROFILE</p>
            </li>
        </ul>

    </div>
  )
}

export default SideNav