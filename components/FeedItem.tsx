'use client'

import instance from '@/lib/axiosConfig';
import { formatDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaRegHeart, FaHeart, FaRegComment, FaShare, FaEllipsisVertical } from "react-icons/fa6";
import DeleteModal from './DeleteModal';

const FeedItem = ({date, imgPath, description, likes, user, postId, isLiked, profilePic, username, postUserId}: PostType) => {
    const router = useRouter();
    const [liked, setLiked] = useState(isLiked);
    const [updatedLikes, setUpdatedLikes] = useState(likes);
    const [likeLoading, setLikeLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    let ownPost = (user.id === postUserId) ? true : false;

    const handleLike = async() => {
        if (likeLoading)
            return

        setLikeLoading(true);

        if (liked){
            await instance.post('/unlike', {
                user_id: user.id,
                post_id: postId
            }).then((res) => {
                if(res.status === 200)
                    setLiked(!liked);
                    setUpdatedLikes(updatedLikes-1);
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            await instance.post('/like', {
                user_id: user.id,
                post_id: postId
            }).then((res) => {
                if(res.status === 200)
                    setLiked(!liked);
                    setUpdatedLikes(updatedLikes+1);
            }).catch((err) => {
                console.log(err);
            });
        }

        setLikeLoading(false);
    }

    const handleVisitProfile = () => {
        router.push(`/profile?id=${postUserId}`);
    }

    const openDeleteModal = () => {
        setShowDeleteModal(true);
        document.body.style.overflow = 'hidden';
    }
    
    const closeDeleteModal = (reload:boolean) => {
        setShowDeleteModal(false);
        document.body.style.overflow = 'auto';

        // reload current page
        if (reload) {
          location.reload();
        }
    }
    return (
    <div className='mx-auto bg-white sm:w-full md:w-3/5 lg:w-2/5 h-fit mb-10 rounded-md py-2 shadow'>
        {showDeleteModal && (
            <DeleteModal imgPath={imgPath} postId={postId} closeModal={closeDeleteModal}/>
        )}
        
        <div className='ml-5 mb-5 flex items-center'>
            <img onClick={handleVisitProfile} className='h-12 mr-2 rounded-3xl cursor-pointer' src={profilePic} alt=''></img>
            
            <div>
                <div className='flex'>
                    <p className='text-red-300 mr-0.5'>@</p>
                    <p onClick={handleVisitProfile} className='text-base cursor-pointer'>{username}</p>
                </div>

                <p className='text-xs'>{formatDate(date)}</p>
            </div>

            {ownPost && (
                <FaEllipsisVertical onClick={openDeleteModal} className='ml-auto mr-5 cursor-pointer'/>
            )}
        </div>

        <div className='w-full px-5 mb-2 text-sm md:text-base '>
            <p>{description}</p>
        </div>

        <div>
            <img className="w-full" src={imgPath} alt=''></img>
        </div>

        {/* line */}
        <div className='h-custom bg-gray-200 w-full my-5'></div>

        {likes === 1 ? (
            <p className='ml-5'> {updatedLikes} like </p>
        ) : (
            <p className='ml-5'> {updatedLikes} likes </p>
        )}

        <div className='my-2 flex ml-5 justify-between'>
            <div className='flex'>
                {!liked ? (
                    <FaRegHeart onClick={handleLike} className='mr-5 text-lg sm:text-xl lg:text-3xl cursor-pointer hover:text-red-300 duration-500'/>
                ) : (
                    <FaHeart onClick={handleLike} className=' mr-5 text-lg sm:text-xl lg:text-3xl cursor-pointer text-red-300'/> 
                )}

                <FaRegComment className='mr-5 text-lg sm:text-xl lg:text-3xl cursor-pointer hover:text-sky-500 duration-500'/>
            </div>

            <FaShare className='mr-5 text-lg sm:text-xl lg:text-3xl cursor-pointer hover:text-sky-500 duration-500'/>
        </div>
    </div>
  )
}

export default FeedItem