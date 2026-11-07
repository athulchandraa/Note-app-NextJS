import notes from '@/models/notesModel'
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


//POST : ADD NOTES
export async function POST(req:NextRequest){
    try{
        await connectDB()
        const body=await req.json()
        const newNote=await notes.create(body)
        return NextResponse.json(newNote,{status:201})
    }catch(err){
        console.log(err);
        return NextResponse.json("Something went wrong",{status:500})
    }
}

//GET : GET ALL NOTES
export async function GET(req:NextRequest){
    try{
        await connectDB()
        const searchParams=req.nextUrl.searchParams
        const email=searchParams.get("email")
        const allNotes=await notes.find({userMail:email})
        return NextResponse.json(allNotes,{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json("Something went wrong",{status:500})
    }
}