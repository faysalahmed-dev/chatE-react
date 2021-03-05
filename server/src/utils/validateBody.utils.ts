import httpError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

import { checkSchema } from 'express-validator';

const passSchema = {
    isEmpty: {
        errorMessage: 'please provide password',
        negated: true,
    },
    isLength: {
        errorMessage: 'password too short min 6 character',
        options: { min: 6 },
    },
};

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
    password: passSchema,
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
    password: passSchema,
});

export const passwordValidate = checkSchema({
    password: passSchema,
    newPassword: passSchema,
});

export const groupCreateValidate = checkSchema({
    groupname: {
        isEmpty: {
            errorMessage: 'group name required',
            negated: true,
        },
        isLength: {
            errorMessage: 'group name is too short',
            options: { min: 2 },
        },
    },
    country: {
        isEmpty: {
            errorMessage: 'country required',
            negated: true,
        },
    },
    location: {
        isEmpty: {
            errorMessage: 'location required',
            negated: true,
        },
    },
    groupType: {
        custom: {
            errorMessage: 'group type either "public" or "private"',
            options(value: string) {
                return ['public', 'private'].includes(value);
            },
        },
    },
});

export const checkImage = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return next(httpError(400, 'image is required'));
    }
    next();
};
