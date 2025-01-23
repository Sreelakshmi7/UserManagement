import fetch from 'node-fetch';
import { body } from 'express-validator';

// URL containing the list of free email providers
const freeEmailProvidersUrl = 'https://gist.github.com/tbrianjones/5992856';

// Function to fetch free email domains
const getFreeEmailDomains = async () => {
    const response = await fetch(freeEmailProvidersUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch the email domains list');
    }
    const text = await response.text();
    const domains = text.split('\n').map(domain => domain.trim()).filter(Boolean);
    return domains;
};
export const emailValidator = async (email) => {
    const freeEmailDomains = await getFreeEmailDomains();
    const emailDomain = email.split('@')[1];
    if (freeEmailDomains.includes(emailDomain)) {
        throw new Error('Only work emails are allowed, no free email providers.');
    }

    return true;
};

export const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(emailValidator), // Custom validator to check for work emails
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least one special character')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one capital letter')
];
