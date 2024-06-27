'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import instance from "../../../lib/axiosConfig";
import { getLoggedInUser } from "@/lib/action/user.action";
import { Loader2 } from "lucide-react"
import { isEmptyString } from "@/lib/utils";
import { showErrorToast } from "@/lib/toast";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // check for authentication token
  useEffect(() => {
    let user:User | undefined = undefined;

    const checkLoggedIn = async() => {
      try {
        user = await getLoggedInUser();
        console.log(user)

        if (user)
          router.push('/')
      } catch (err) {
        console.log("error getting logged in user: " + err);
      }
    };

    checkLoggedIn();
  }, [])

  const handleLogin = async() => {
    // disable if waiting for server response
    if (isLoading) return;

    if (isEmptyString(email) || isEmptyString(password)) {
      showErrorToast("Email or password missing");
      return;
    }

    const lowerCaseEmail = email.toLowerCase();

    setIsLoading(true);
    
    try {
      const res = await instance.post('/login', {
          email: lowerCaseEmail,
          password: password
      });
      
      if (res.status === 200) {
        router.push('/');
      } else {
        showErrorToast('Check username and password');
        setIsLoading(false);
      }
    } catch (err:any) {
        console.log(err);
        
        if (err.response) {
          showErrorToast(err.response.data.message);
        } else {
          showErrorToast("We're having trouble connecting. Please try again later");
        }
        
        setIsLoading(false);
    }
  }

  const handleUseDemo = () => {
    setEmail('sjqueen@asu.edu');
    setPassword('samsamsam');
    handleLogin();
  }

  return (
    <main className="flex justify-center items-center w-screen h-screen px-5">
      <div className=" bg-white px-5 py-10 h-fit w-96">
        <img className='h-40 mx-auto mb-10' src='./logo.png' alt=''></img>

        <p>Email</p>
        <input 
          onChange={(e) => {setEmail(e.target.value)}} 
          className="border mb-5 w-full px-2 py-1"
          type='text'
        />

        <p>Password</p>
        <input 
          onChange={(e) => {setPassword(e.target.value)}} 
          className="border mb-5 w-full px-2 py-1"
          type='password'
        />

        <Button 
          onClick={() => {handleLogin()}}
          className="w-full p-2 bg-red-300 hover:bg-red-400 duration-500 text-center cursor-pointer text-white"
        >
          {isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}

          LOGIN
        </Button>

        <div className="h-custom w-full my-5 bg-gray-300 "></div>

        <div className="w-full text-center">
          <p>
            <Link href='./sign-up' className="text-blue-500">Create </Link>
            Account or use
            <span onClick={handleUseDemo} className="text-blue-500 cursor-pointer"> Demo </span>
          </p>
        </div>
      </div>

      <img className='h-3/4 ml-10 hidden md:block' src='./phone.png' alt=''></img>
    </main>
  );
}
