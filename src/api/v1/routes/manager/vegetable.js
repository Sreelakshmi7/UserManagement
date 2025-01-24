import express from 'express';
import { managerAuthMiddleware } from '../../middleware/managerAuthMiddleware.js'; 
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
import passport from 'passport';

const router = express.Router();

// Manager route to create a new vegetable
router.post('/create', passport.authenticate('jwt', { session: false }), managerAuthMiddleware, validate(createVegetableValidation()), async (req, res) => {
    createVegetable(req, res);
});

// Manager route to get all vegetables
router.get('/list', passport.authenticate('jwt', { session: false }), managerAuthMiddleware, async (req, res) => {
    getAllVegetables(req, res);
});
// Manager route to get vegetable by ID
router.get('/get/:vegetable_id', passport.authenticate('jwt', { session: false }), managerAuthMiddleware, validate(getVegetableValidation()), async (req, res) => {
    getVegetableById(req, res);
});

// Manager route to update vegetable by ID
router.patch('/update/:vegetable_id', passport.authenticate('jwt', { session: false }), managerAuthMiddleware, validate(updateVegetableValidation()), async (req, res) => {
    updateVegetableById(req, res);
});

// Manager route to delete vegetable by ID
router.post('/delete/:vegetable_id', passport.authenticate('jwt', { session: false }), managerAuthMiddleware, validate(deleteVegetableValidation()), async (req, res) => {
    deleteVegetableById(req, res);
});

export const vegetablesRouter = router;
