import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createDefaultUser } from './api/v1/routes/admin/addDynamicData.js'; 

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    console.error('MongoDB URL is not defined in the .env file');
    process.exit(1);
}

export const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected successfully');

        // After successful connection, create the default user if it doesn't exist
        // await createDefaultUser(); // Call the createDefaultUser function

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};
