import express from 'express';
import { loginValidation } from "../../../../bl/validations/loginValidation.js";
import { loginUser } from "../../../../bl/v1/login.js";
import { validate } from '../../../../services/expressValidator/helper.js';
import passport from '../../../../config/passport.js';  

const router = express.Router();

// Login route
router.post('/login', validate(loginValidation), passport.authenticate('local', { session: false }), async (req, res) => {
    await loginUser(req, res); 
});

export const loginRouter = router;
