import { validationResult } from 'express-validator';


export const validate = (validations) => {
    return async (req, res, next) => {
        // Run all validations
        await Promise.all(validations.map(validation => validation.run(req)));

        // Check for validation errors
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next(); // Continue to the next middleware
        }

        // Prepare error messages
        let messages = '';
        errors.array().forEach(element => {
            messages += (element.msg + '\n');
        });

        // Respond with errors
        return res.status(400).json({
            status: false,
            data: errors.array(),
            message: messages.trim(), // Remove trailing newline
        });
    };
};
