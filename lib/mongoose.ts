import mongoose from 'mongoose';

let isConnected = false; //to check if mongoose is connected

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log('MONGODB URL NOT FOUND');
    if (isConnected) return console.log('ALREADY CONNECTED TO MONGODB');

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;
        console.log('Connected - MONGODB')
    } catch (error) {
        console.log(error);
    }
}