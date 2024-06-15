import ImageGallery from '@/components/ImageGallery';
import { Button } from '@/components/ui/button';
import CustomButton from '@/components/ui/customButton';
import instance from '@/lib/axiosConfig';
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import React from 'react';
import { getLoggedInUser, getUserById } from '@/lib/action/user.action';

export default async function Profile({ searchParams }: any) {
  const loggedInUser:User | undefined = await getLoggedInUser();
  const profilePageUserId = searchParams.id;
  const profilePageUser:User | undefined = await getUserById(profilePageUserId);
  let usersPage = false;

  // check for authentication
  if (!loggedInUser) {
    redirect('/sign-in');
    return 
  }

  // check if on logged in users profile page
  if (loggedInUser.id === profilePageUser!.id)
    usersPage = true;

  return (
    <div className="flex w-full justify-center">

      {/* Sidenav filler. Helps center content. */}
      <div className='w-24 xl:w-80 hidden md:block'></div>

      <div className='py-20 w-full  md:w-3/4 xl:w-1/2'>
        <div className='mb-20 flex items-center'>
          <img className='rounded-full h-24 md:h-32 lg:h-48 mr-5' src={profilePageUser!.profile_picture} alt=''/>

          <div>
            <div className='flex'>
              <h1 className='text-2xl text-blue-400 mr-1'>@</h1>
              <h1 className='text-2xl'>{profilePageUser!.username || 'undefined'}</h1>
            </div>

            <div className='flex my-2'>
              <p className='text-sm mr-5'>12k Followers</p>
              <p className='text-sm'>12 Posts</p>
            </div>

            
            {!usersPage && (
              <div className='flex'>
              <div className='mr-5'>
                <CustomButton text="Follow" type="primary"/>
              </div>
              <div>
                <CustomButton text="Message" type="secondary"/>
              </div>
            </div>
            )}
            
          </div>
        </div>

        <ImageGallery userId={profilePageUser!.id} />
      </div>
    </div>
  );
}