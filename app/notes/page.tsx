"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPen, FaPowerOff, FaStickyNote, FaTrash, FaUser } from "react-icons/fa";



    interface Note{
        _id:string;
        title:string;
        description:string;
        color:string;
        userMail:string;
        createdAt:string
    }

export default function notes(){



    const {data:session,status}=useSession()
    const [allNotes,setAllNotes]=useState<Note[]>([])
    console.log(allNotes);
    
    // console.log(session,status);

    useEffect(()=>{
        if(session?.user?.email){
            fetchNotes()
        }
    },[session])

    const fetchNotes=async()=>{
        const res=await fetch(`/api/notes?email=${session?.user?.email}`)
        const serverResponse=await res.json()
        setAllNotes(serverResponse)
    }
    

    if(status=="loading"){
        return <p className="text-lg font-medium mt-10 text-center">Loading...</p>
    }

    if(status=="unauthenticated"){
        redirect('/login')
    }

    //Handle Delete

    const handleDelete=async(id:string)=>{
        const res=await fetch(`/api/notes/${id}`,{method:"DELETE"})
        toast.success("deleted Successfully")
        fetchNotes()
    }
    

    return(
        <div>
            <div className="bg-white shadow px-5 py-2 flex justify-between">
                <div className="flex items-center gap-2 text-3xl text-blue-600 font-medium">
                    <FaStickyNote />
                    <p>Note Hub</p>
                </div>
               
                <div className="flex items-center gap-2 text-gray-600 text-xl font-medium">
                    <FaUser/>
                    <p>{session?.user?.name}</p>
                    <FaPowerOff onClick={()=>signOut()}/>
                </div>
            </div>

            <div className="h-150 px-20 flex justify-center items-center">
                <div className="shadow rounded mt-10 flex items-center p-5">
                    <div className=" w-full p-2">
                        <p className="text-4xl font-medium text-blue-600">My Notes</p>
                        <div className=" my-5 grid grid-cols-4 p-2 gap-5">
                            {/* Duplication */}
                            
                            {
                                allNotes?.length>0 &&
                                allNotes.map(note=>(
                                    <div key={note?._id} className={`bg-${note?.color}-00 rounded w-70 font-medium px-3 py-5 hover:scale-105 transition-transform duration-300 cursor-pointer`}>
                                <div className="flex items-center justify-between p-3">
                                    <p>{note?.title}</p>
                                    <Link href={`/notes/${note?._id}`}><FaPen className="hover:scale-150 transition-transform duration-300 cursor-pointer"/></Link>
                                </div>
                                <div className="shadow mt-3 p-2">
                                    <p>{note?.description}</p>
                                </div>
                                <div className="my-3 flex items-center justify-between">
                                    <p>{new Date(note?.createdAt).toLocaleDateString()}</p>
                                    <Link href={``}><FaTrash onClick={()=>handleDelete(note?._id)} className="text-red-600 hover:scale-150 transition-transform duration-300 cursor-pointer"/></Link>
                                </div>
                            </div>
                                ))
                            }
                            <div >
                                <Link href={'/notes/add'}>Add Note</Link>
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
            
        </div>
    )
}