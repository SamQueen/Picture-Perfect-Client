import React from 'react'
import FeedItem from './FeedItem'
import axios from '../lib/axiosConfig';
import AddFeedBtn from './AddFeedBtn';

const Feed = async({ user } : { user:User }) => {
  
  const feedItemsResponse = await axios.get('/feed', {
    params: {
      id: user.id
    }
  }).catch((err) => {
    console.log("Error fetching Feed: " + err);
    return { data: [] };
  });

  const feedItems:FeedItem[] = feedItemsResponse?.data ?? [];
  return (
    <div className='w-screen min-h-full px-2 py-24 m-0'>

        <AddFeedBtn userId={user.id} />

        {feedItems.map((item:FeedItem, i:number) => (
          <FeedItem 
            imgPath={item.image} 
            description={item.caption}
            likes = {item.like_count}
            key={i}
            user={user}
            postId={item.post_id}
            isLiked={item.is_liked}
            profilePic={item.profile_picture}
            username={item.username}
            userId={user.id}
          />
        ))}
    </div>
  )
}

export default Feed