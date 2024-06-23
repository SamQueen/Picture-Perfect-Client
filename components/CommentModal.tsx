'use client'
import React, { useEffect, useState } from 'react'
import { FaX } from 'react-icons/fa6'
import PostComment from './PostComment'
import { Input } from './ui/input'
import instance from '@/lib/axiosConfig'
import { showErrorToast } from '@/lib/toast'

const CommentModal = ({ closeModal, imgPath, postId, user }: CommentModalProps) => {
    const [comments, setComments] = useState<PostComment[]>([]);
    const [content, setContent] = useState('');


    const getComments = async() => {
        try {
            const response = await instance.get('/getComments', {
                params: {
                    post_id: postId
                }
            });
            console.log(response);
            setComments(response.data.comments)
        } catch (err) {
            console.log('Error getting comments and replies: ' + err);
        }
    }

    useEffect(() => {
        getComments();
    }, [])
  
    const handleAddComment = async () => {
        if (content === '') return
        
        try {
            const response = await instance.post('/addComment', {
                postId: postId,
                content: content,
                userId: user.id,
            });

            setContent('');
            getComments();
        } catch (err) {
            console.log('Error adding comment: ' + err);
            showErrorToast("Problem adding comment. Please try again later.");
        }
    }

    return (
        <div className='fixed w-full h-full top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center'>
            <FaX 
                onClick={closeModal}
                className='absolute top-5 right-5 text-xl text-white cursor-pointer' 
            />

            <div className='bg-white h-3/4 rounded-lg w-[95%] xl:w-[75%] lg:flex relative overflow-hidden'>
                <div className='w-full xl:w-[60%] h-1/2 lg:h-full flex justify-center items-center  bg-gray-800 overflow-hidden'>
                    <img className='' src={imgPath}></img>
                </div>

                <div className='w-full xl:w-[40%] px-5 pt-5 pb-20 h-1/2 lg:h-full relative overflow-auto'>
                    {comments.map((comment: PostComment) => (
                        <PostComment key={comment.id} comment={comment} />
                    ))}   

                </div>

                <div className='flex w-full xl:w-[40%] bg-white items-center absolute bottom-0 right-0 p-2 border-t border-gray-300'>
                    <img className='rounded-full h-10' src={user.profile_picture} alt='profile photo'></img>
                    <Input onChange={(e) => { setContent(e.target.value) }} value={content} placeholder='Add a comment' />
                    <p onClick={handleAddComment} className='text-blue-500 ml-2 hover:text-blue-700 cursor-pointer'>Post</p>
                </div>
            </div>
        </div>
  )
}

export default CommentModal