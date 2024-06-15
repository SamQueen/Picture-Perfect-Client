'use client'

import instance from '@/lib/axiosConfig';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaRegHeart, FaHeart, FaRegComment, FaShare } from "react-icons/fa6";

const FeedItem = ({imgPath, description, likes, user, postId, isLiked, profilePic, username, userId}: PostType) => {
    const router = useRouter();
    const [liked, setLiked] = useState(isLiked);
    const [updatedLikes, setUpdatedLikes] = useState(likes);
    const [likeLoading, setLikeLoading] = useState(false);

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
        router.push(`/profile?id=${userId}`);
    }

    return (
    <div className='mx-auto bg-white sm:w-full md:w-3/5 lg:w-2/5 h-fit mb-10 rounded-md py-2 shadow'>
        <div className='ml-5 mb-5 flex items-center'>
            <img onClick={handleVisitProfile} className='h-12 mr-2 rounded-3xl cursor-pointer' src={profilePic} alt=''></img>
            
            <div>
                <div className='flex'>
                    <p className='text-red-300 mr-0.5'>@</p>
                    <p onClick={handleVisitProfile} className='text-base cursor-pointer'>{username}</p>
                </div>

                <p className='text-xs'>May 5 2024 @4:15pm</p>
            </div>
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