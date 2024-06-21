'use client'
import instance from '@/lib/axiosConfig';
import { showErrorToast } from '@/lib/toast';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { FaX } from 'react-icons/fa6';
import { FaRegTrashCan } from "react-icons/fa6";

const DeleteModal = ({ closeModal, postId, imgPath }: DeleteModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleDelete = async() => {
        setIsLoading(true);

        try {
            const res = await instance.delete(`/deletePost?id=${postId}&imgPath=${imgPath}`);
            setIsLoading(false);
            closeModal(true);
        } catch (err) {
            console.log('Error deleting the post: ' + err);
            showErrorToast('There was a problem. Please try again');
            setIsLoading(false);
        }
    }
  
    return (
    <div className='fixed w-full h-full top-0 left-0 bg-black bg-opacity-20 flex justify-center items-center'>
        {isLoading ? (
            <Loader2 className="animate-spin" />
        ) : (
            <div className='bg-white h-60 rounded-lg w-64 relative overflow-hidden'>
                <div className='h-[80%] flex justify-center items-center'>
                    <div>
                        <FaRegTrashCan className='mx-auto text-2xl mb-5'/>
                        <p>Delete Post?</p>
                    </div>
                </div>

                <div className='flex h-[50px] w-full'>
                    <div onClick={handleDelete} className='w-[50%] h-full flex justify-center items-center border-t border-gray cursor-pointer'>
                        <p>Yes</p>
                    </div>

                    <div onClick={() => {closeModal(false)}} className='w-[50%] h-full flex justify-center items-center border border-gray cursor-pointer'>
                        <p>no</p>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default DeleteModal