import fetch from 'node-fetch';
import { body, param } from 'express-validator';

// URL containing the list of free email providers
const freeEmailProvidersUrl = 'https://gist.github.com/tbrianjones/5992856';

// Function to fetch free email domains
const getFreeEmailDomains = async () => {
    const response = await fetch(freeEmailProvidersUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch the email domains list');
    }
    const text = await response.text();
    const domains = text
        .split('\n')
        .map(domain => domain.trim().toLowerCase()) 
        .filter(domain => domain && domain.includes('.')); 
    return domains;
};


const emailValidator = async (email) => {
    const freeEmailDomains = await getFreeEmailDomains();
    const emailDomain = email.split('@')[1]?.toLowerCase().trim(); // Extract and normalize domain

    if (!emailDomain) {
        throw new Error('Invalid email format');
    }

    // Check if the domain exists in the free email list
    if (freeEmailDomains.includes(emailDomain)) {
        throw new Error('Only work emails are allowed, no free email providers.');
    }

    return true;
};

export const createUserValidation = () => {
    return [
        body('first_name')
            .notEmpty()
            .withMessage('First name is required')
            .trim()
            .escape(),
        body('last_name')
            .notEmpty()
            .withMessage('Last name is required')
            .trim()
            .escape(),
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format')
            .custom(emailValidator), // Custom email validation
        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/[A-Z]/)
            .withMessage('Password must contain at least one uppercase letter')
            .matches(/[0-9]/)
            .withMessage('Password must contain at least one number')
            .matches(/[@$!%*?&]/)
            .withMessage('Password must contain at least one special character'),
        body('user_type')
            .notEmpty()
            .withMessage('User type is required')
            .isIn(['Admin', 'Manager'])
            .withMessage('User type must be either Admin or Manager'),
        body('profile_picture')
            .optional()
            .isString()
            .withMessage('Profile picture must be a string if provided')
    ];
};

// Update user validation
export const updateUserValidation = () => {
    return [
        param('user_id')
            .notEmpty()
            .withMessage('User ID is required')
            .isUUID(4)
            .withMessage('Invalid UUID for user ID'),
        body('first_name')
            .optional()
            .notEmpty()
            .withMessage('First name is required')
            .trim()
            .escape(),
        body('last_name')
            .optional()
            .notEmpty()
            .withMessage('Last name is required')
            .trim()
            .escape(),
        body('email')
            .optional()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format')
            .custom(emailValidator)
            .withMessage('Only work emails are allowed')
    ];
};

// Delete user validation
export const deleteUserValidation = () => {
    return [
        param('user_id')
            .notEmpty()
            .withMessage('User ID is required')
            .isUUID(4)
            .withMessage('Invalid UUID for user ID')
    ];
};

// Get user by ID validation
export const getUserValidation = () => {
    return [
        param('user_id')
            .notEmpty()
            .withMessage('User ID is required')
            .isUUID(4)
            .withMessage('Invalid UUID for user ID')
    ];
};
