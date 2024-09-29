const { body, validationResult } = require('express-validator');

// User signup validation
exports.validateSignup = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Habit validation
exports.validateHabit = [
    body('name').notEmpty().withMessage('Habit name is required'),
    body('frequency').isIn(['daily', 'weekly', 'custom']).withMessage('Frequency must be daily, weekly, or custom'),
    body('duration').notEmpty().withMessage('Duration is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
