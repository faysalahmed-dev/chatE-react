import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import _ from 'lodash';
import catchError from '../utils/catchError.js';
import sendResponse from '../utils/sendResponse';
import User from '@/model/user/index.js';
import { IReq, UserBody } from '@/ts/interface.js';
import httpError from 'http-errors';

export const registerUser = catchError(
    async (req: IReq<UserBody>, res, next) => {
        // check email already taken
        const hasUser = await User.findOne({
            email: req.body.email.toLowerCase(),
        });

        if (hasUser) return next(httpError(403, 'email already taken'));

        // if not error create new user
        const newUser = await User.create(
            _.pick(req.body, ['name', 'email', 'username', 'password'])
        );

        // gen new token
        const token = newUser.generateToken();

        sendResponse(res, 201, { data: newUser }, token);
    }
);

// login exitsing user
export const loginUser = catchError(async (req: IReq<UserBody>, res, next) => {
    // check user is exits
    const user = await User.findOne({
        email: req.body.email.toLowerCase(),
    }).select('+password');

    // if not user found thorw the error
    if (!user) return next(httpError(404, 'no user found'));
    // @ts-ignore
    console.log(req.body.username);
    // check password
    const isMatch = await user.validatePassword(req.body.password);

    // if password not match throw error
    if (!isMatch) {
        return next(httpError(401, 'invalid email and password'));
    }

    // code reach this line mean user is found and passowrd match

    // gen auth token
    const token = user.generateToken();

    sendResponse(res, 200, { data: user }, token);
});

export const logoutUser = catchError(async (__, res) => {
    sendResponse(res, 200, { message: 'logout successfully' }, '');
});
