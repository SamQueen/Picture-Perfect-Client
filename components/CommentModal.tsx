'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaX } from 'react-icons/fa6'
import PostComment from './PostComment'
import { Input } from './ui/input'
import instance from '@/lib/axiosConfig'
import { showErrorToast } from '@/lib/toast'
import { Loader2 } from 'lucide-react'

const CommentModal = ({ closeModal, imgPath, postId, user }: CommentModalProps) => {
    const [comments, setComments] = useState<PostComment[]>([]);
    const [content, setContent] = useState('');
    const [parentId, setParentId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const submitCommentBtn = useRef(null);

    const getComments = async() => {
        try {
            const response = await instance.get('/getComments', {
                params: {
                    post_id: postId
                }
            });

            setComments(response.data.comments)
        } catch (err) {
            console.log('Error getting comments and replies: ' + err);
        }
    }

    useEffect(() => {
        getComments();
    }, [])

    const setReply = (parentId: any, username: string) => {
        setParentId(parentId);
        setContent(`@${username} `);
    }
  
    const handleAddComment = async () => {
        if (content === '') return
        
        // check if there is an add comment request pedning
        if (isLoading) {
            return;
        }

        // update the loading status
        setIsLoading(true);

        try {
            const response = await instance.post('/addComment', {
                postId: postId,
                content: content,
                userId: user.id,
                parentId: parentId,
            });

            setContent('');
            setParentId(null);
            getComments();
            setIsLoading(false);
        } catch (err) {
            console.log('Error adding comment: ' + err);
            showErrorToast("Problem adding comment. Please try again later.");
            setIsLoading(false);
        }
    }
    
    const handleOnBlur = (e: any) => {
        // Check if use clicked on sumbit commnet button
        if (e.relatedTarget === submitCommentBtn.current) {
            return; // return nothing
        }
 
        // reset comment content and parent id
        setContent('');
        setParentId(null);
    }

    return (
        <div className='fixed w-full h-full top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center'>
            <FaX 
                onClick={closeModal}
                className='absolute top-5 right-5 text-xl text-white cursor-pointer' 
            />

            <div className='bg-white h-3/4 rounded-lg w-[95%] xl:w-[75%] lg:flex relative overflow-hidden'>
                <div className='w-full lg:w-[60%] xl:w-[70%] h-1/2 lg:h-full flex justify-center items-center  bg-gray-800 overflow-hidden'>
                    <img className='' src={imgPath}></img>
                </div>

                <div className='w-full lg:w-[40%] md:1- xl:w-[30%] px-5 pt-5 pb-20 h-1/2 lg:h-full relative overflow-auto'>
                    {comments.map((comment: PostComment) => (
                        <PostComment setReply={setReply} key={comment.id} comment={comment} />
                    ))}   

                </div>

                <div className='flex w-full lg:w-[40%] xl:w-[30%] bg-white items-center absolute bottom-0 right-0 p-2 border-t border-gray-300'>
                    <img className='rounded-full h-10 mr-2' src={user.profile_picture} alt='profile photo'></img>
            
                    <Input 
                        onChange={(e) => { setContent(e.target.value) }} 
                        value={ content }
                        placeholder='Add a comment'
                        onBlur={(e) => { handleOnBlur(e) }}
                    />
                    
                    {isLoading ? (
                        <Loader2 className='animate-spin'/>
                    ) : (
                        <button  
                            ref={submitCommentBtn} 
                            onClick={ handleAddComment }
                            className='text-blue-500 ml-2 hover:text-blue-700 cursor-pointer'
                        >
                            Post
                        </button>
                    )}

                </div>
            </div>
        </div>
  )
}

export default CommentModal