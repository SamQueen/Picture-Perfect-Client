import React from 'react';
import FeedItem from './FeedItem';
import AddFeedBtn from './AddFeedBtn';
import { getUserFeed } from '@/lib/action/user.action';

const Feed = async({ user } : { user:User }) => {
  let feedItems:FeedItem[] = await getUserFeed(user.id);
  
  return (
    <div className='w-screen min-h-full px-2 py-24 m-0'>
        <AddFeedBtn user={user} />
        
        {feedItems.map((item:FeedItem, i:number) => (
          <FeedItem 
            imgPath={item.image} 
            description={item.caption}
            likes = {item.like_count}
            key={i}
            user={user}
            postUserId={item.user_id}
            postId={item.post_id}
            isLiked={item.is_liked}
            profilePic={item.profile_picture}
            username={item.username}
            date={item.date}
          />
        ))}
    </div>
  )
}

export default Feed