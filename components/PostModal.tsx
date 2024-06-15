'use client'
import React, { useState } from 'react';
import { FaX, FaArrowLeft, FaRegImage } from "react-icons/fa6";
import { Textarea } from './ui/textarea';
import instance from '@/lib/axiosConfig';
import FormData from 'form-data';
import { Slider } from './ui/slider';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';

const PostModal = ({ closeModal, userId }: PostModal) => {
    const router = useRouter();
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
    const [file, setFile] = useState<string | Blob>('');
    const [fileSet, setFileSet] = useState(false);
    const [showNext, setShowNext] = useState(false);
    const [caption, setCaption] = useState('');
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log(e.target.files);
            setFileUrl(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0]);
            setFileSet(true);
        }
    }

    const handleSubmit = async() => {
        const formData:any = new FormData();
        formData.append('image', file);

        await instance.post('createPost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                user_id: userId,
                caption: caption,
            },
        }).then((res) => {
            closeModal(true);
            router.push('/');
        }).catch((err) => {
            console.log('Error creating post: ' + err)
        });
    }

    const toggleNext = () => {
        setShowNext(!showNext);
    }

    return (
    <div className='absolute w-full h-full top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center'>
        <FaX 
            onClick={() => {closeModal(false)}}
            className='absolute top-5 right-5 text-xl text-white cursor-pointer' 
        />

        <div className='bg-white h-3/4 rounded-lg w-[95%] md:w-[80%] lg:w-[75%] xl:w-[60%] relative overflow-hidden'>
            
            <div className='border-b border-gray flex justify-center h-[26px] relative'>
                {showNext && (
                    <h1 
                        onClick={toggleNext} 
                        className='absolute left-5 cursor-pointer'
                    >
                        back
                    </h1>
                )}
                
                <h1>Add an image</h1>
                
                {fileSet && !showNext && (
                    <h1 
                        onClick={toggleNext} 
                        className='absolute right-5 text-blue-400 hover:text-blue-600 duration-500 cursor-pointer'
                    >
                        next
                    </h1>
                )}

                {showNext && (
                    <h1 
                        onClick={handleSubmit} 
                        className='absolute right-5 text-blue-400 hover:text-blue-600 duration-500 cursor-pointer'
                    >
                        post
                    </h1>
                )}
            </div>

            {!fileSet && (
                <div className="flex justify-center items-center h-full">
                    <input className="" type="file" onChange={handleFileChange}></input>
                </div>
            )}
            
            {fileSet && (
                <div className="h-full w-full rounded-b-lg relative">
                    <img className="absolute w-full h-full " src={fileUrl} />
                    
                    <div className="flex justify-center items-center h-[calc(100%-26px)] w-full bg-black bg-opacity-80 rounded-b-lg relative z-1">
                        <img className="max-w-full h-full" src={fileUrl} />
                    </div>
                </div>
            )}

            <div className={`bg-white h-[calc(100%-26px)] w-full absolute top-[26px] p-5 duration-1000 ${showNext ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='w-full h-[calc(50%-26px)] flex justify-center items-center bg-black bg-opacity-80'>
                    <img className="h-full" src={fileUrl} />
                </div>

                <div className='w-full h-[calc(50%-26px)] pt-5'>
                    <Label>Brightness</Label>
                    <Slider className="mb-3 mt-1" defaultValue={[0]} max={50} min={-50} />

                    <Label>Contrast</Label>
                    <Slider className="mb-3 mt-1" defaultValue={[0]} max={50} min={-50} /> 

                    <Label>Sharpness</Label>
                    <Slider className="mb-3 mt-1" defaultValue={[0]} max={50} min={-50} /> 
                    
                    <div className='w-full mt-5'>
                        <Label>Add a caption!</Label>
                        <Textarea onChange={(e) => {setCaption(e.target.value)}} />
                    </div>
                </div>
            </div>

            
        </div>
    </div>
  )
}

export default PostModal