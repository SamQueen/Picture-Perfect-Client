import React from 'react'
import { FaRegHeart, FaHeart } from "react-icons/fa6";

const Reply = ({ comment, setReply }: CommentProps) => {
  return (
    <div className='flex mb-2'>
        <img className="h-5 rounded-full mr-2" src={comment.profilePic} alt="user profile pic"></img>

        <div >
            <p className='text-sm'> @<a href="" className='text-blue-300'>{comment.username}</a> {comment.content}</p>

            <div className='flex items-center'>
                <FaHeart className='text-sm text-red-300 mr-2 cursor-pointer' />
                <p className='text-xs'>4 likes</p>
            </div>
        </div> 
    </div>
  )
}

export default Reply