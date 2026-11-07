"use client"

import { signIn } from "next-auth/react";
import Link from "next/link"
import { useState } from "react";
import toast from "react-hot-toast";


export default function Login(){


    const[userDetails,setUserDetails]=useState({
            email:"",password:""
        })
        console.log(userDetails);

        //Handle LOGIN

        const handleLogin=async(e:any)=>{
            e.preventDefault()
            const {email,password}=userDetails
            if(!email || !password){
                toast.error("Please fill the form completely..")
            }else{
                const res=await signIn("credentials",{
                    email,password,redirect:false
                })
                console.log(res);
                if(res?.ok){
                    toast.success("Login successfull")
                    setTimeout(()=>{
                        window.location.href="/notes"
                    },2000)
                }else{
                    toast.error("Invalid credentials")
                }
                setUserDetails({email:"",password:""})
            }
        }

    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-green-400 p-5 rounded w-100">
                <p className="text-2xl font-bold text-white">Note Hub</p>
                <p className="text-white">Note Everything you need to remember!!</p>
                <form>
                    <div className="mt-5 mb-3 w-full">
                        <input onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} type="text" placeholder="email" className="rounded px-3 py-1 bg-gray-100 w-full"/>
    
                    </div>
                    <div>
                        <input onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} type="password" placeholder="password" className="rounded px-3 py-1 bg-gray-100 w-full" />
                    </div>
                </form>
                <div className="mt-5 flex gap-5 items-center">
                    <button onClick={handleLogin} type="submit" className="text-white bg-green-950 rounded px-3 py-1 font-medium">Login</button>
                    <span className="font-medium">New User ? <Link href={'/register'} className="text-blue-900 font-medium">Register</Link></span>
                </div>
            </div>
        </div>
    )
}