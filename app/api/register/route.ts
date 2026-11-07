import { connectDB } from "@/lib/mongodb";
import users from '@/models/userModel'
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


//Register Controller Function : POST

export async function POST(req:NextRequest){
    try{
        await connectDB()
        const {name,email,password}=await req.json()
        //Check Existing User
        const existingUser=await users.findOne({email})
        console.log(existingUser);
        
        if(existingUser){
            return NextResponse.json({message:"User Already Exist!!",data:{}},{status:400})
        }else{
            const encryptedPassword=await bcrypt.hash(password,10)
            const newUser=await users.create({
                name,email,password:encryptedPassword
            })
            return NextResponse.json({message:"User Registered Successfully...",data:newUser},{status:201})
        }

    }catch(err){
        console.log(err);
        return NextResponse.json({message:"Something went Wrong !!",data:{}},{status:500})
    }
}