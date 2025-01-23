import User from '../../models/mongo/userSchema.js';
import bcrypt from 'bcrypt';

export async function createUser(req, res) {
    try {
        const firstName = req?.body?.first_name ?? null;
        const lastName = req?.body?.last_name ?? null;
        const email = req?.body?.email ?? null;
        const password = req?.body?.password ?? null;
        const userType = req?.body?.user_type ?? null;
        const profilePicture = req?.body?.profile_picture ?? null;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword, 
            userType,
            profilePicture,
        });
        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType,
                profilePicture: user.profilePicture,
            },
        });
    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(500).json({
            message: 'Server error while creating user',
            error: err.message,
        });
    }
}

// Get all users with pagination and sorting
export async function getUsers(req, res) {
    try {
        const { page = 1, limit = 10, sortBy = 'firstName' } = req.query;
        const users = await User.find()
            .sort({ [sortBy]: 1 }) // Sorting based on the query parameter
            .skip((page - 1) * limit) // Pagination
            .limit(parseInt(limit));

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error while fetching users',
            error: err.message,
        });
    }
}

// Get user by ID
export async function getUserById(req, res) {
    try {
        const userId = req.params.user_id;
        const user = await User.findOne({ userId });  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error while fetching user',
            error: err.message,
        });
    }
}

// Update user by ID
export async function updateUserById(req, res) {
    try {
        const userId = req.params.user_id;  
        const firstName = req?.body?.first_name ?? null;
        const lastName = req?.body?.last_name ?? null;
        const email = req?.body?.email ?? null;
        const updateData = { firstName, lastName, email };
        const user = await User.findOneAndUpdate({ userId: userId }, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error while updating user',
            error: err.message,
        });
    }
}




// Delete user by ID
export async function deleteUserById(req, res) {
    try {
        const userId = req.params.user_id;
        const user = await User.findOneAndDelete({ userId }); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error while deleting user',
            error: err.message,
        });
    }
}

// Search users
export async function searchUsers(req, res) {
    try {
        const firstName = req?.body?.first_name ?? null;
        const lastName = req?.body?.last_name ?? null;
        const email = req?.body?.email ?? null;
        const userType = req?.body?.user_type ?? null;
        const query = {};

        if (firstName) query.first_name = { $regex: firstName, $options: 'i' }; 
        if (lastName) query.last_name = { $regex: lastName, $options: 'i' }; 
        if (email) query.email = { $regex: email, $options: 'i' };
        if (userType) query.user_type = userType; 

        const users = await User.find(query);

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error while searching users',
            error: err.message,
        });
    }
}


