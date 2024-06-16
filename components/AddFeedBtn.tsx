'use client'
import React, { useState } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import PostModal from './PostModal';

const AddFeedBtn = ({userId} : AddFeedBtnProps) => {
    const [postModal, setPostModal] = useState(false);

    const openModal = () => {
        setPostModal(true);
        document.body.style.overflow = 'hidden';
    }
    
    const closeModal = (reload:boolean) => {
        setPostModal(false);
        document.body.style.overflow = 'auto';

        // reload current page
        if (reload) {
          location.reload();
        }
    }

  return (
    <div>
        {postModal && <PostModal userId={userId} closeModal={closeModal} />}

        <FaCirclePlus onClick={openModal} className='mx-auto mb-5 text-4xl text-red-300 cursor-pointer plus-animate' />
    </div>
  )
}

export default AddFeedBtn