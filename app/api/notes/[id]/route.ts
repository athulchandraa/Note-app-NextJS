import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import notes from '@/models/notesModel'


//GET : get data from api

export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}){

    try{

        await connectDB()
        const {id}=await params
        const noteDetails=await notes.findById({_id:id})
        return NextResponse.json(noteDetails,{status:200})

    }catch(err){
        console.log(err);
        return NextResponse.json("Something went wrong",{status:500})
        
    }

}


//PUT : Edit notes

export async function PUT(req:NextRequest,{params}:{params:Promise<{id:string}>}){

    try{
        await connectDB()
        const {id}=await params
        const reqBody=await req.json()
        const updateNote=await notes.findByIdAndUpdate({_id:id},reqBody,{new:true})
        return NextResponse.json(updateNote,{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json("Something went wrong",{status:500})
    }

}

//DELETE : delete note

export async function DELETE(req:NextRequest,{params}:{params:Promise<{id:string}>}){

    try{
        await connectDB()
        const {id}=await params
        const deleteBody=await notes.findByIdAndDelete({_id:id})
        return NextResponse.json(deleteBody,{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json("Something went wrong",{status:500})
    }
}