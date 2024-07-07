'use client'
import React, { useEffect, useState } from 'react'
import { FaX } from 'react-icons/fa6'
import { Input } from './ui/input'
import { Button } from './ui/button'
import instance from '@/lib/axiosConfig'
import { ScrollArea } from './ui/scroll-area'

declare type MessageModalUser = {
    id: number,
    username: string,
    profilePhoto: string,
}

const MessageModal = ({ closeModal, openMessages }: MessageModalProps) => {
    const [searchInput, setSearchInput] = useState('');
    const [users, setUsers] = useState<MessageModalUser[]>([]);

    const searchUsers = async() => {
        if (!searchInput) return;
        
        try {
            const response = await instance.get('searchUsers', {
                params: {
                    input: searchInput,
                }
            })
            setUsers(response.data.users);
        } catch(err) {
            console.log('Error seaching for user' + err);
        }
    }

    // filters and updates the visible users on input
    useEffect(() => {
        searchUsers();
    }, [searchInput])

    const handleMessageUser = (otherUser: MessageModalUser) => {
        openMessages(otherUser.id, otherUser.username, otherUser.profilePhoto);
        closeModal();
    }

    return (
        <div className='fixed w-full h-full top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center z-[12]'>
            <FaX 
                onClick={closeModal}
                className='absolute top-5 right-5 text-xl text-white cursor-pointer' 
            />
            
            <div className='bg-white p-5 h-[350px] rounded-lg w-[95%] md:w-[50%] xl:w-[27%] relative'>
                <div className='flex w-full'>
                    <Input onChange={(e) => {setSearchInput(e.target.value)}} placeholder='Search for User'></Input>
                </div>

                <ScrollArea className='h-[290px] '>
                    {users.map((user: MessageModalUser, i) => (
                        <div key={i} className='flex items-center py-1 cursor-pointer hover:bg-gray-200 duration-500'>
                            <img className="h-10 w-10 rounded-full mr-5" src={user.profilePhoto} alt="profile photo"></img>
                            {user.username}
                            <Button onClick={() => {handleMessageUser(user)}} className='ml-auto'>Message</Button>
                        </div>
                    ))}
                </ScrollArea>
            </div>  
        </div>
  )
}

export default MessageModal