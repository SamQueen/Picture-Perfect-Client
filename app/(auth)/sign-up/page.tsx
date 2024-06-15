import React from "react";
import { SignUpForm } from "@/components/SignUpForm";

export default function SignUp() {
  return (
    <main className="flex justify-center items-center w-screen px-5">  
      
      <div className="py-5 px-10 border">
        <h1 className="text-2xl mb-10 text-center">Sign Up</h1>

        <SignUpForm />
      </div>
    </main>
  );
}
