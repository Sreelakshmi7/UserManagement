import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../../../../models/mongo/userSchema.js'; 
import { v4 as uuidv4 } from 'uuid'; 
export const createDefaultUser = async () => {
    const defaultFirstName = 'Super';
    const defaultLastName = 'Admin';
    const defaultEmail = 'superadmin@gmail.com';
    const defaultPassword = 'adminpassword'; 
    const defaultUserType = 'Admin'; 
    const defaultProfilePicture = ''; 

    const hashedPassword = await bcrypt.hash(defaultPassword, 10); 
    const existingUser = await User.findOne({ email: defaultEmail });
    if (!existingUser) {
        const newUser = new User({
            userId: uuidv4(), 
            firstName: defaultFirstName,
            lastName: defaultLastName,
            email: defaultEmail,
            password: hashedPassword, 
            userType: defaultUserType, 
            profilePicture: defaultProfilePicture,
        });

        await newUser.save();
        console.log('Default user created');
    } else {
        console.log('Default user already exists');
    }
};
