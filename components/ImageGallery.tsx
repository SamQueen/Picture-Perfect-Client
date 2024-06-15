import instance from '@/lib/axiosConfig';
import React from 'react'

const ImageGallery = async({userId}: ImageGalleryProps) => {
  const res = await instance.get('/getPosts', {
    params: {
      id: userId,
    }
  });

  let posts = [];

  if (res && res.data) {
    posts = res.data.data;
  }

  if (posts.length === 0) {
    return (
      <div className='flex justify-center items-center'>
        <h1>No posts yet 😓</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-start">
     
      {posts.map((item:any, i:number) => (
        <img
          key={i} // Added a key prop for each item in the list
          className="w-1/3 box-border p-1 cursor-pointer"
          src={item.image}
          alt="Beach"
        />
      ))}
    </div>
  )
}

export default ImageGallery