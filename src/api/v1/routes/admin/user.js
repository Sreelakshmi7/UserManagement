import express from 'express';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById, searchUsers } from '../../../../bl/v1/user.js';
import passport from 'passport'; 
import { validate } from '../../../../services/expressValidator/helper.js';
import { createUserValidation, getUserValidation, updateUserValidation, deleteUserValidation } from '../../../../bl/validations/userValidation.js';
import {adminRoleMiddleware} from '../../middleware/adminAuthMiddleware.js'; 
const router = express.Router();
router.use(express.json());

// Admin route to create a new user
router.post('/create', passport.authenticate('jwt', { session: false }), adminRoleMiddleware, validate(createUserValidation()), async (req, res) => {
    createUser(req, res);
});

// Admin route to get all users (Pagination, Sorting)
router.get('/list', passport.authenticate('jwt', { session: false }), adminRoleMiddleware, async (req, res) => {
    getUsers(req, res);  
});

// Admin route to get user by ID
router.get('/get/:user_id', passport.authenticate('jwt', { session: false }), adminRoleMiddleware, validate(getUserValidation()), async (req, res) => {
    getUserById(req, res);
});

// Admin route to update user by ID
router.patch('/update/:user_id', passport.authenticate('jwt', { session: false }), adminRoleMiddleware, validate(updateUserValidation()), async (req, res) => {
    updateUserById(req, res);
});

// Admin route to delete user by ID
router.post('/delete/:user_id', passport.authenticate('jwt', { session: false }), adminRoleMiddleware, validate(deleteUserValidation()), async (req, res) => {
    deleteUserById(req, res);
});

// Admin route to search users
router.post('/search', passport.authenticate('jwt', { session: false }), adminRoleMiddleware, async (req, res) => {
    searchUsers(req, res);
});

export const userRouter = router;
