'use state'
import instance from '@/lib/axiosConfig';
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { FaAngleLeft } from "react-icons/fa6";

const MessageDisplay = ({ showMessages, setShowMessages, messages, setMessages, sendMessage, otherUserId, userId }: MessageDisplayProps) => {
    const [message, setMessage] = useState('');

    const getMessages = async() => {
        try {
            const response = await instance.get('messages', {
                params: {
                    userId: userId,
                    otherUserId: otherUserId,
                }
            });

            setMessages(response.data.messages);
        } catch (err) {
            console.log('Error loading messages: ' + err);
        }
    }

    useEffect(() => {
        getMessages();
    }, [otherUserId])
  
    const handleSumbit = async() => {
        await sendMessage(message);

        // clear input
        setMessage('');
    }

    return (
        <div className={`w-full md:w-full h-full absolute md:relative overflow-hidden bg-white `}>
            <div className='md:hidden'>
                <FaAngleLeft className="ml-5 mt-5" onClick={() => {setShowMessages(false)}} />
            </div>
            
            <ScrollArea className='h-full pb-24 pt-5 md:pt-10 px-5 flex flex-col-reverse'>
                
                {messages.map((message, i) => (
                    <div key={i}>
                        {message.userId === otherUserId ? (
                            <div key={i} className='flex mt-5 justify-end'>
                                <p className='bg-cyan-600 h-fit p-2 rounded-md text-white max-w-[80%]'>{message.content}</p>
                                <img className='h-12 rounded-full ml-5' alt='profile photo' src={message.profilePhoto}></img>
                            </div>
                        ) : (
                            <div className='flex mt-5'>
                                <img className='h-12 rounded-full mr-5' alt='profile photo' src={message.profilePhoto}></img>
                                <p className='bg-cyan-600 h-fit p-2 rounded-md text-white max-w-[90%]'>{message.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </ScrollArea>

            <div className='sticky bg-white border-t border-gray-300 bottom-0 w-full px-2 py-5 flex items-center z-10'>
                <Input value={message} placeholder='Send a Message' onChange={(e) => {setMessage(e.target.value)}}/>
                <span onClick={handleSumbit} className='ml-2 cursor-pointer'>Send</span>
            </div>
        </div>
    )
}

export default MessageDisplay