import express from 'express';
import { loginValidation } from "../../../../bl/validations/loginValidation.js";
import { loginUser } from "../../../../bl/v1/login.js";
import { validate } from '../../../../services/expressValidator/helper.js';
import passport from '../../../../config/passport.js';  

const router = express.Router();


router.post(
    '/login',
    validate(loginValidation),
    (req, res, next) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                console.error('Error during authentication:', err.message);
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }
            if (!user) {
                console.warn('Authentication failed:', info.message);
                return res.status(401).json({ message: info.message });
            }
            req.user = user;
            next();
        })(req, res, next); 
    },
    async (req, res) => {
        await loginUser(req, res);
    }
);


export const loginRouter = router;
