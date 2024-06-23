'use client'
import React, { useState } from 'react'
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Reply from './Reply';


const PostComment = ({ comment }: CommentProps) => {
  const [showReplys, setShowReplys] = useState(false);

  const handleShowReplys = () => {
    setShowReplys(!showReplys);
  }

  return (
    <div className='mb-5'>
        <div className='flex items-center'>
            <img src={comment.profilePic} className='rounded-full h-6 mr-2'></img>
            <p className='text-sm tracking-wide text-blue-500'>@{comment.username}</p>
        </div>

        <p className='text-sm mb-1'>{comment.content}</p>

        <div>
          <div className='flex'>
            <FaHeart className='text-red-300 mr-2' />
            <p className='text-xs mr-2'>22 likes</p>
            <p className='text-xs cursor-pointer'>reply</p>
          </div>

          {/* replies */}
          {comment.replies.length != 0 && (
            <div>
              <p onClick={handleShowReplys} className='text-xs cursor-pointer'>view replies</p>
          
              <div className={`px-10 border-l border-gray-400 transition overflow-hidden ${showReplys ? 'h-auto' : 'h-0'}`}>
                {comment.replies.map((reply:PostComment) => (
                  <Reply key={reply.id} comment={reply} />
                ))}
              </div>
            </div>
          )}
        </div>

    </div>
  )
}

export default PostComment