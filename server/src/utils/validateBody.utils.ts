const { checkSchema } = require('express-validator');

export const singupBodyValidate = checkSchema({
    name: {
        isEmpty: {
            errorMessage: 'please provide full name',
            negated: true,
        },
        isLength: {
            errorMessage: 'name too short',
            options: { min: 4 },
        },
        custom: {
            errorMessage: 'name only contains alpha value',
            options(value: string) {
                return /^[a-zA-Z ]+$/.test(value);
            },
        },
    },
    username: {
        isEmpty: {
            errorMessage: 'please provide username name',
            negated: true,
        },
        isLength: {
            errorMessage: 'user name too short',
            options: { min: 4 },
        },
    },
    email: {
        isEmpty: {
            errorMessage: 'please provide email address',
            negated: true,
        },
        isEmail: {
            errorMessage: 'invalid email address',
        },
    },
    password: {
        isEmpty: {
            errorMessage: 'please provide password',
            negated: true,
        },
        isLength: {
            errorMessage: 'password too short min 6 character',
            options: { min: 6 },
        },
    },
});

export const loginBodyValidate = checkSchema({
    email: {
        isEmpty: {
            errorMessage: 'email required',
            negated: true,
        },
        isEmail: {
            errorMessage: 'invalid email address',
        },
    },
    password: {
        isEmpty: {
            errorMessage: 'password required',
            negated: true,
        },
        isLength: {
            errorMessage: 'password too short min 6 character',
            options: { min: 6 },
        },
    },
});
