import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';  

const UserSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true, default: uuidv4 },  
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['Admin', 'Manager'], required: true },
    profilePicture: String,  // Optional field
});

const User = mongoose.model('User', UserSchema);
export default User;
