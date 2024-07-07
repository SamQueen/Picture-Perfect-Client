'use client'
import CreateMessage from '@/components/CreateMessage';
import MessageDisplay from '@/components/MessageDisplay';
import MessageModal from '@/components/MessageModal';
import MessagePanel from '@/components/MessagePanel';
import { socket } from '@/lib/socket';
import React, { useEffect, useState } from 'react';

export default function Messages({ searchParams }: any) {
    const userId:number = searchParams.id;
    const [messages, setMessages]  = useState<Message[]>([]);
    const [showMessages, setShowMessages] = useState(false);
    const [otherUserId, setOtherUserId] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [receivedMessage, setReceivecedMessage] = useState<Message | undefined>(undefined);
    const [otherUsername, setOtherUsername] = useState('');
    const [otherUserPhoto, setOtherUserPhoto] = useState(''); 

    // recieve message event
    useEffect(() => {
        socket.on("rec_message", (data) => {
            // use functional state update to ensure latest state is used
            setMessages((messages) => [...messages, data]);
            setReceivecedMessage(data);
        });

        // remove event listener when componenet unmounts
        return () => {
            socket.off('rec_message');
        }
    }, [socket])

    // send a message
    const sendMessage = async(message: string) => {
        // check for an empty message
        if (!message) return;

        socket.emit('send_message', { message: message, userId: userId, otherUserId: otherUserId }, (response: any) => {
            // display new message
            let newMessagesArray: Message[] = [...messages, response];
            setMessages(newMessagesArray);
        });

        return Promise.resolve();
    }

    const openMessages = (id: number, username: string, photo: string) => {
        setShowMessages(true);
        setOtherUserId(id);
        setOtherUsername(username);
        setOtherUserPhoto(photo);
    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
    <div className="w-screen h-screen md:pl-24 xl:pl-80 flex">
        {showModal && (
            <MessageModal openMessages={openMessages} closeModal={closeModal}/>
        )}
        
        <MessagePanel openModal={openModal} userId={userId} openMessages={openMessages} receivedMessage={receivedMessage} />

        {showMessages ? (
            <MessageDisplay 
                setShowMessages={setShowMessages} 
                messages={messages} 
                setMessages={setMessages} 
                sendMessage={sendMessage} 
                userId={userId} 
                otherUserId={otherUserId}
                otherUsername={otherUsername}
                otherUserPhoto={otherUserPhoto}
            />
        ) : ( 
            <CreateMessage openModal={openModal}/>
        )}
    </div>
    );
}