import express from 'express';
import passport from 'passport'; 
import { adminAuthMiddleware } from '../../middleware/adminAuthMiddleware.js';


import { validate } from '../../../../services/expressValidator/helper.js';

import { 
    createVegetableValidation,
    updateVegetableValidation,
    deleteVegetableValidation,
    getVegetableValidation
} from '../../../../bl/validations/vegetableValidation.js';
import { 
    createVegetable,
    getAllVegetables,
    getVegetableById,
    updateVegetableById,
    deleteVegetableById 
} from '../../../../bl/v1/vegetable.js';

const router = express.Router();

// Admin route to create a new vegetable
router.post('/create', passport.authenticate('jwt', { session: false }), adminAuthMiddleware, validate(createVegetableValidation()), async (req, res) => {
    createVegetable(req, res);
});

// Admin route to get all vegetables
router.get('/list', passport.authenticate('jwt', { session: false }), adminAuthMiddleware, async (req, res) => {
    getAllVegetables(req, res);
});

// Admin route to get vegetable by ID
router.get('/get/:vegetable_id', passport.authenticate('jwt', { session: false }), adminAuthMiddleware, validate(getVegetableValidation()), async (req, res) => {
    getVegetableById(req, res);
});

// Admin route to update vegetable by ID
router.patch('/update/:vegetable_id', passport.authenticate('jwt', { session: false }), adminAuthMiddleware, validate(updateVegetableValidation()), async (req, res) => {
    updateVegetableById(req, res);
});

// Admin route to delete vegetable by ID
router.delete('/delete/:vegetable_id', passport.authenticate('jwt', { session: false }), adminAuthMiddleware, validate(deleteVegetableValidation()), async (req, res) => {
    deleteVegetableById(req, res);
});

export const vegetableRouter = router;
