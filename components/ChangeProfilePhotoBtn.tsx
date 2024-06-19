'use client'
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ChangeProfilePhotoModal from './ChangeProfilePhotoModal';
import { useRouter } from 'next/navigation';

const ChangeProfilePhotoBtn = ({ user, profilePhoto } : ChangeProfileBtnProps) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    }

    const closeModal = (reload:boolean) => {
        setShowModal(false);
        document.body.style.overflow = 'auto';

        // reload current page
        if (reload) {
            location.reload();
        }
    }

    return (
    <div>
        {showModal && (
            <ChangeProfilePhotoModal closeModal={closeModal} user={user}/>
        )}      

        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                <img 
                    onClick={openModal} 
                    className='rounded-full h-24 md:h-32 lg:h-48 mr-5 cursor-pointer' 
                    src={profilePhoto} 
                    alt=''
                />
                </TooltipTrigger>
                <TooltipContent>
                <p>Change profile photo</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
  )
}

export default ChangeProfilePhotoBtn