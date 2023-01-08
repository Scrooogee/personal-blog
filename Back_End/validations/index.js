import { body } from "express-validator";

export const registerValidation = [
    body('email', 'email is not correct').isEmail(),
    body('password', 'password should be min 5 symbols').isLength({min: 5}),
    body('fullName', 'full name should be min 3 symbols').isLength({min: 3}),
    body('avatar').optional().isURL()
];

export const postValidation = [
    body('title', 'input the titel').isLength({min: 3}).isString(),
    body('text', 'input the text').isLength({min: 10}).isString(),
    body('tags', 'input the correct tags').optional().isArray(),
    body('image').optional().isURL()
];

export const comentValidation = [
    body('text', 'input the text').isLength({min: 3}).isString(),

];