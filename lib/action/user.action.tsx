'use server'
import { cookies } from "next/headers";
import instance from "../axiosConfig";

export const logout = () => {
    cookies().delete('access_token');
}

/**
 * Fetches the logged-in user based on the cookies provided in the request headers.
 * If the user is not logged in or an error occurs, returns undefined.
 *
 * @returns {Promise<User | undefined>} The logged-in user or undefined if not logged in.
 */
export const getLoggedInUser = async():Promise<User | undefined> => {
    const cookieHeader = cookies().toString();
    
    try {
        const response = await instance.post('loggedInUser', {}, {
        headers: {
            Cookie: cookieHeader,
        },
        });

        const user = response.data;
        return user;
    } catch(err) {
        console.error('Error gettting logged in user: ' + err);
        return undefined;
    } 
}

export const getUserById = async(userId:number):Promise<User | undefined> => {

    try {
        const response = await instance.get('userById', {
            params: {
                userId: userId
            }
        });
        const user = response.data;
        return user;
    } catch (err) {
        console.error('Error gettting user by ID: ' + err);
        return undefined;
    }
};

export const getUserFeed = async(userId:number):Promise<FeedItem[]> => {
    try {
        const response = await instance.get('/feed', {
            params: {
                id: userId
            }
        });

        return response.data;
    } catch (err) {
        console.log('Error getting users feed: ' + err);
        return [];
    }
}