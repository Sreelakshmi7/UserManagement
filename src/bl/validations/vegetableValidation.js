import { body, param } from 'express-validator';

// Validation for creating a vegetable
export const createVegetableValidation = () => {
    return [
        body('name')
            .notEmpty().withMessage('Name is required')
            .trim().escape(),
        body('color')
            .notEmpty().withMessage('Color is required')
            .matches(/^#[0-9A-Fa-f]{6}$/).withMessage('Color must be a valid hex code'),
        body('price')
            .notEmpty().withMessage('Price is required')
            .isDecimal().withMessage('Price must be a valid number or decimal')
            .toFloat(),
    ];
};

// Validation for updating a vegetable
export const updateVegetableValidation = () => {
    return [
        param('vegetable_id')
            .notEmpty().withMessage('Vegetable ID is required')
            .isUUID().withMessage('Invalid UUID format'),
        body('name')
            .optional()
            .notEmpty().withMessage('Name is required')
            .trim().escape(),
        body('color')
            .optional()
            .notEmpty().withMessage('Color is required')
            .matches(/^#[0-9A-Fa-f]{6}$/).withMessage('Color must be a valid hex code'),
        body('price')
            .optional()
            .notEmpty().withMessage('Price is required')
            .isDecimal().withMessage('Price must be a valid number or decimal')
            .toFloat(),
    ];
};

// Validation for deleting a vegetable
export const deleteVegetableValidation = () => {
    return [
        param('vegetable_id')
            .notEmpty().withMessage('Vegetable ID is required')
            .isUUID().withMessage('Invalid UUID format'),
    ];
};

// Validation for getting a vegetable by ID
export const getVegetableValidation = () => {
    return [
        param('vegetable_id')
            .notEmpty().withMessage('Vegetable ID is required')
            .isUUID().withMessage('Invalid UUID format'),
    ];
};
