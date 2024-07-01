import React from 'react';
import { FaComment } from "react-icons/fa6";
import { Button } from './ui/button';

const CreateMessage = ({ openModal } : any) => {
  return (
    <div className='w-full h-full hidden md:flex justify-center items-center'>
        <div className='flex flex-col items-center'>
          <div className='ml-5 w-fit p-5 border border-black rounded-full animate-bounce cursor-pointer z-[-1]'>
              <FaComment />
          </div>

          <p className='my-5'>Send a New Message</p>

          <Button onClick={openModal}>Send Message</Button>
        </div>
    </div>
  )
}

export default CreateMessage