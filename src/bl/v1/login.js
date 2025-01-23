import jwt from 'jsonwebtoken';

// Business logic for token generation
export async function loginUser(req, res) {
    
    const user = req.user; 
    const payload = {
        userId: user._id,
        email: user.email,
        userType: user.userType, 
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({
        message: 'Login was a success',
        token: `${token}`,
    });
}
