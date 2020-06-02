import _ from 'lodash';
import httpError from 'http-errors';
import catchError from '../utils/catchError';
import User from '@/model/user';

import { IReq } from '../ts/interface';

import { UserPublicPropertyI } from '@/model/user/user.interface';

export const isAuthenticated = catchError(
    async (req: IReq<{}, UserPublicPropertyI>, res, next) => {
        let token: string;

        const tokenHeader = req.header('authorization');

        if (tokenHeader && tokenHeader.startsWith('Bearer ')) {
            token = tokenHeader.replace('Bearer ', '');
        } else {
            return next(httpError(401, 'Access denied. No token provided.'));
        }

        // verify the token
        const { iat, id } = await User.verifyToken(token);

        // console.log(token);
        // check user is exits
        const currentUser = await User.findById(id).select('+password');

        if (!currentUser) {
            return next(httpError(404, 'no user found or exites'));
        }

        // check after token is issued password is changed
        if (currentUser.passwordIsChange(iat)) {
            return next(
                httpError(
                    401,
                    'User Recently Change Password Please Login Again'
                )
            );
        }

        req.user = currentUser;

        next();
    }
);
