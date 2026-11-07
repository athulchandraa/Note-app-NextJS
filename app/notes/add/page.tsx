"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCircle, FaPowerOff, FaStickyNote, FaUser } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

export default function add(){

    const {data:session,status}=useSession()
        console.log(session,status);

        console.log(session?.user?.email);
        

        const [noteDetails,setNotedetails]=useState({
            title:"",description:"",color:"",userMail:session?.user?.email
        })

        console.log(noteDetails);
        
    
        if(status=="loading"){
            return <p className="text-lg font-medium mt-10 text-center">Loading...</p>
        }
    
        if(status=="unauthenticated"){
            redirect('/login')
        }

        const resetNote=()=>{
            setNotedetails({
                title:"",description:"",color:"",userMail:session?.user?.email
            })
        }


        //Handlinfg add
        const handleAddNotes=async()=>{
            const userMail=session?.user?.email
            const {title,description,color}=noteDetails
            if(!title || !description || !color){
                toast.error("Please fill the form completely...")
            }else{
                //API CALL
                const res=await fetch('/api/notes',{method:"POST",body:JSON.stringify(noteDetails)})
                if(res.status==201){
                    toast.success("Note added successfully...")
                    resetNote()
                }else{
                    toast.error("Something went wrong...")
                }
            }
        }




    return(
        <div>
            <div className="bg-white shadow px-5 py-2 flex justify-between">
                                        <div className="flex items-center gap-2 text-3xl text-blue-600 font-medium">
                                            <Link href={'/notes'} className="flex items-center">
                                                <FaStickyNote />
                                                <p>Note Hub</p>
                                            </Link>
                                        </div>
                                       
                                        <div className="flex items-center gap-2 text-gray-600 text-xl font-medium">
                                            <FaUser/>
                                            <p>Athul</p>
                                            <FaPowerOff onClick={()=>signOut()}/>
                                        </div>
            </div>
            
            <div className="flex justify-center items-center h-150">
                <div className="shadow rounded p-5 w-150">
                        <div className="mb-2" >
                            <p className="text-3xl font-bold text-blue-500">NoteApp</p>
                            <p className="text-gray-600 font-medium">Add notes</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <MdOutlineClose onClick={resetNote} className="text-3xl hover:scale-110 transition-transform duration-300 cursor-pointer" />
                            <p onClick={handleAddNotes} className="text-white bg-pink-700 w-fit px-3 py-1 rounded-lg hover:scale-110 transition-transform duration-300 cursor-pointer">Save</p>
                        </div>
                        <div className="my-5 flex justify-around">
                            <FaCircle onClick={()=>setNotedetails({...noteDetails,color:"yellow"})} className={noteDetails.color=="yellow" ? "text-yellow-400 hover:scale-150 transition-transform duration-300 cursor-pointer border border-black rounded-full" : "text-yellow-400 hover:scale-150 transition-transform duration-300 cursor-pointer"}/>
                            <FaCircle onClick={()=>setNotedetails({...noteDetails,color:"red"})} className={noteDetails.color=="red" ? "text-red-400 hover:scale-150 transition-transform duration-300 cursor-pointer border border-black rounded-full" : "text-red-400 hover:scale-150 transition-transform duration-300 cursor-pointer"}/>
                            <FaCircle onClick={()=>setNotedetails({...noteDetails,color:"green"})} className={noteDetails.color=="green" ? "text-green-400 hover:scale-150 transition-transform duration-300 cursor-pointer border border-black rounded-full" : "text-green-400 hover:scale-150 transition-transform duration-300 cursor-pointer"}/>
                            <FaCircle onClick={()=>setNotedetails({...noteDetails,color:"blue"})} className={noteDetails.color=="blue" ? "text-blue-400 hover:scale-150 transition-transform duration-300 cursor-pointer border border-black rounded-full" : "text-blue-400 hover:scale-150 transition-transform duration-300 cursor-pointer"}/>
                        </div>
                        <div className="flex flex-col">
                            <input value={noteDetails.title} onChange={(e)=>setNotedetails({...noteDetails,title:e.target.value})} className="px-3 py-1 my-2" type="text" placeholder="Title" />
                            <input value={noteDetails.description} onChange={(e)=>setNotedetails({...noteDetails,description:e.target.value})} className="px-3 py-1 h-20 my-2" type="text" placeholder="Description" />
                        </div>
                </div>
            </div>
        </div>
    )
}