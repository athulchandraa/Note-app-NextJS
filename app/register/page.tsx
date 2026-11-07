"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Register(){

    const router=useRouter()

    const[userDetails,setUserDetails]=useState({
        name:"",email:"",password:""
    })
    console.log(userDetails);

    //Handling Register

    const handleRegister=async(e:any)=>{
        e.preventDefault()
        console.log("Inside  Hnadle Register Controller");
        
        const {name,email,password}=userDetails
        if(!name || !email || !password){
            toast.error("Please fill the form !!")
        }else{
            //API CALLING
            const res=await fetch('/api/register',{
                method:"POST",
                body:JSON.stringify(userDetails)
            })
            console.log(res);
            const serverResponse=await res.json()
            if(res.status==201){
                toast.success(serverResponse.message)
                setTimeout(()=>{
                    router.push('/login')
                },2000)
            }else{
                toast.error(serverResponse.message)
            }
            setUserDetails({name:"",email:"",password:""})
        }
    }
    

    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-green-400 p-5 rounded w-100">
                <p className="text-2xl font-bold text-white">Note Hub</p>
                <p className="text-white">Note Everything you need to remember!!</p>
                 <form>
                     <div className="mt-5 mb-3 w-full">
                        <input onChange={(e)=>setUserDetails({...userDetails,name:e.target.value})} type="text" placeholder="Name" className="rounded px-3 py-1 bg-gray-100 w-full"/>
                    </div>
                    <div className="mt-5 mb-3 w-full">
                        <input onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} type="text" placeholder="email" className="rounded px-3 py-1 bg-gray-100 w-full"/>
                    </div>
                    <div>
                        <input onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} type="password" placeholder="password" className="rounded px-3 py-1 bg-gray-100 w-full" />
                    </div>
                 </form>
                <div className="mt-5 flex gap-5 items-center">
                    <button onClick={handleRegister} type="submit" className="text-white bg-green-950 rounded px-3 py-1 font-medium">Register</button>
                    <span className="font-medium">Already a user ? <Link href={'/login'} className="text-green-900 font-medium">Login</Link></span>
                </div>
            </div>
        </div>
    )
}