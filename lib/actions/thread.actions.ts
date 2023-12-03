"use server"

import { revalidatePath } from "next/cache";
import Mood from "../models/mood.models";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { currentUser } from "@clerk/nextjs";
import mongoose from "mongoose";

interface Params{
    text: string,
    author: string,
    communityId: string | null,
    path: string,
    moodImage: string,
    
}

export async function createMood({text,author,path, moodImage,}: Params){
    connectToDB();
    try {
        //this is for creating the mood
        const createMood = await Mood.create({
            text,
            author,
            moodImage
        });

        //Push or Update user model
        await User.findByIdAndUpdate(author, {
            $push: { moods: createMood._id }
        });

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`);
        
    }
    
    
}

export async function fetchPosts(pageNumber = 1, pageSize = 20){
    connectToDB();

    const skipAmount = (pageNumber -1) * pageSize;

    //fetching posts with no parents
    const postsQuery = Mood.find({ parentId: { $in: [null, undefined]} })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: 'author', model: User})
    /*.populate({ 
        path: 'children',
        populate: {
            path: 'author',
            model: User,
            select: "_id name parentId image"
        }
     }) */

     const totalPostsCount = await Mood.countDocuments({ parentId: { $in: [null, undefined]} })

     const posts = await postsQuery.exec();

     const isNext = totalPostsCount > skipAmount + posts.length;

     return {posts, isNext};
}

export async function fetchMoodById(id: string){
    connectToDB();

    try {
        const mood = await Mood.findById(id)
        .populate({
            path: 'author',
            model: User,
            select: "_id id name image"
        }).exec();

        return mood;
        
    } catch (error: any) {
        throw new Error(`Error fetching mood: ${error.message}`)
        
    }
}

export async function handleDeleteMood(id: string): Promise<void> {
    try {
        connectToDB();

        const deleteMood = await Mood.findById(id);

        if(!deleteMood) {
            throw new Error("Mood not found");
        }

        const uniqueAuthorId = deleteMood.author?._id?.toString();
        
        await Mood.deleteOne({ _id: id });

        if (uniqueAuthorId) {
            await User.updateOne(
                { _id: uniqueAuthorId },
                { $pull: { moods: id } }
            );
        }

    } catch (error: any) {
        throw new Error(`Failed to delete thread: ${error.message}`);
    }
}