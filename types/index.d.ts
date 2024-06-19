/* eslint-disable no-unused-vars */

import { Area } from "react-easy-crop"

declare type User = {
    created_at: string,
    email: string,
    first_name: string,
    id: number,
    last_name: string,
    password: string,
    profile_picture: string,
    role: string,
    status: string,
    username: string,
}

declare type FeedItem = {
    profile_picture: string,
    first_name: string,
    last_name: string,
    username: string,
    user_id: number,
    post_id: number,
    caption: string,
    date: string,
    image: string,
    like_count: number,
    is_liked: boolean,
}

declare type SideNavTpye = {
    user: User,
}

declare type BottomNavType = {
    user: User,
}

declare type PostType = {
    user:User,
    imgPath: string,
    description: string,
    likes: number,
    postId: number,
    isLiked: boolean,
    profilePic: string,
    username: string,
    userId: number,
}

declare type PostModal = {
    closeModal: any,
    userId: number,
}

declare type CustomButton = {
    text: string,
    type: 'primary' | 'secondary',
}

declare type ImageGalleryProps = {
    userId: number,
}

declare type AddFeedBtnProps = {
    userId: number,
}

declare type ChangeProfileBtnProps = {
    profilePhoto: string,
    user: User,
}

declare type ImageCropProps = {
    image: string | undefined,
    croppedAreaPixels: Area | null,
    setCroppedAreaPixels: any,
}