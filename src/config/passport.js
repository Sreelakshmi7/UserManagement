import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/mongo/userSchema.js';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';


passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    console.warn('LocalStrategy: User not found:', email);
                    return done(null, false, { message: 'User not found' }); 
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    console.warn('LocalStrategy: Incorrect password for email:', email);
                    return done(null, false, { message: 'Wrong password' }); 
                }
                return done(null, user);
            } catch (err) {
                console.error('LocalStrategy: Error during authentication:', err.message);
                return done(null, false, { message: 'Internal server error' }); 
            }
        }
    )
);

// JWT Strategy (Token-based Authentication)
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY, 
        },
        async (jwtPayload, done) => {
            try {
                console.log('JwtStrategy: jwtFromRequest function:', ExtractJwt.fromAuthHeaderAsBearerToken());
                console.log('JwtStrategy: Received JWT payload:', jwtPayload);

                const user = await User.findById(jwtPayload.userId); 
                if (!user) {
                    console.warn('JwtStrategy: User not found for payload userId:', jwtPayload.userId);
                    return done(null, false, { message: 'User not found' });
                }

                console.log('JwtStrategy: Authentication successful for userId:', jwtPayload.userId);
                return done(null, user);
            } catch (err) {
                console.error('JwtStrategy: Error during authentication:', err.message);
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserializing user with id:', id);

        const user = await User.findById(id);
        if (!user) {
            console.warn('Deserialization: User not found for id:', id);
        } else {
            console.log('Deserialization: User successfully deserialized:', user.email);
        }

        done(null, user);
    } catch (err) {
        console.error('Deserialization: Error during deserialization:', err.message);
        done(err);
    }
});

// Enhanced logging in middleware to track JWT token and errors
export const managerAuthMiddleware = (req, res, next) => {
    console.log('managerAuthMiddleware: Checking user type...');
    
    if (req.user && req.user.userType === 'Manager') {
        console.log('managerAuthMiddleware: Manager access granted');
        return next(); 
    }
    
    console.log('managerAuthMiddleware: Forbidden: You are not a manager');
    return res.status(403).json({ message: 'Forbidden: You are not a manager' });
};

export default passport;
