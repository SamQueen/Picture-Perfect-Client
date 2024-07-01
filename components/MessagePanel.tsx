'use client'
import instance from '@/lib/axiosConfig';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

declare type messageP = {
    id: number,
    sender_id: number,
    receiver_id: number,
    content: string,
    timestamp: string,
    status: string,
    otherUserId: number,
    otherUserUsername: string,
    otherUserProfilePhoto: string
}

const MessagePanel = ({ openModal, userId, openMessages, receivedMessage }: MessagePanelProps) => {
    const [messages, setMessages] = useState<messageP[]>([]);
    const [loading, setLoading] = useState(false);

    const getRecentMessagesByConverstaion = async() => {
        try {
            const response = await instance.get('messagesByConversation', {
                params: {
                    userId: userId,
                }
            });

            setMessages(response.data.messages);
        } catch (err) {
            console.log('Error getting message panel: ' + err);
        }
    }

    // load message panel
    useEffect(() => {
        getRecentMessagesByConverstaion();
    }, []);

    // add new message to panel when received
    useEffect(() => {
        if (receivedMessage) {
            let newPanelMessage: messageP = {
                id: receivedMessage.id,
                sender_id: receivedMessage.sender_id,
                receiver_id: userId,
                content: receivedMessage.content,
                timestamp: receivedMessage.timestamp,
                status: 'unopened',
                otherUserId: receivedMessage.userId,
                otherUserUsername: receivedMessage.username,
                otherUserProfilePhoto: receivedMessage.profilePhoto
            };
            
            // check if user has sent a previous message
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].sender_id === newPanelMessage.sender_id) {
                    let newMessagesArray = messages;
                    
                    newMessagesArray[i] = newPanelMessage;
                    setMessages([...newMessagesArray]);

                    return;
                }
            }

            // add new message to panel
            setMessages([...messages, newPanelMessage]);
        }
    }, [receivedMessage]);

  return (
    <div className='w-full md:w-80 xl:w-96 h-full pt-20 border-r border-black-400'>
        
        <div className='w-full flex justify-center'>
            <Button onClick={openModal} className='mb-5'>Send New Message</Button>
        </div>

        {loading ? (
            <div className='h-full w-full pt-44 flex justify-center'>
                <Loader2 className='animate-spin' />
            </div>
        ) : (
            <div>
                {[...messages].reverse().map((message, i) => (
                    <div onClick={() => {openMessages(message.otherUserId)}} className='flex cursor-pointer hover:bg-gray-100 duration-500 py-3 px-2' key={i}>
                        
                        <img className='h-12 rounded-full mr-2' alt='profile photo' src={message.otherUserProfilePhoto}></img>
        
                        <div className='w-full whitespace-nowrap overflow-hidden text-ellipsis block'>
                            <p>@{message.otherUserUsername}</p>
        
                            {message.status === 'unopened' && message.receiver_id == userId ? (
                                <span className='font-semibold'>{message.content}</span>
                            ) : (
                                <span className=''>{message.content}</span>
                            )}
                            
                        </div>
                    </div>
                ))}
            </div>
        )}

    </div>
  )
}

export default MessagePanel