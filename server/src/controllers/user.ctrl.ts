import url from 'url';
import _ from 'lodash';
import { Types } from 'mongoose';
import catchError from '../utils/catchError.js';
import sendResponse from '../utils/sendResponse';
import User from '@/model/user';
import { UserI } from '@/model/user/user.interface';
import { AuthReq, IUpdatePassword, ReqBody, UserBody } from '@/ts/interface.js';
import httpError from 'http-errors';

export const registerUser = catchError(
    async (req: ReqBody<UserBody>, res, next) => {
        // check email already taken
        const hasUser = await User.findOne({
            email: req.body.email.toLowerCase(),
        });

        if (hasUser) return next(httpError(403, 'email already taken'));

        // if not error create new user
        // @ts-ignore
        const userObj = _.pick(req.body, [
            'name',
            'email',
            'username',
            'password',
        ]) as UserI;

        const domain = url.format({
            protocol: req.protocol,
            host: req.get('host'),
        });

        userObj.avater = `${domain}/chat-app-images/default-avater.png`;

        const newUser = await User.create(userObj);

        // gen new token
        const token = newUser.generateToken();

        sendResponse(res, 201, { data: newUser }, token);
    }
);

// login exitsing user
export const loginUser = catchError(
    async (req: ReqBody<UserBody>, res, next) => {
        // check user is exits
        const user = await User.findOne({
            email: req.body.email.toLowerCase(),
        })
            .select('+password')
            .populate(
                'requests friendsLists sendRequests',
                'id name username avater',
                'User',
                null,
                { limit: 15 }
            );

        // if not user found thorw the error
        if (!user) return next(httpError(403, 'no user found'));
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
    }
);

export const logoutUser = catchError(async (__, res) => {
    sendResponse(res, 200, { message: 'logout successfully' }, '');
});

export const updateUser = catchError(
    async (req: AuthReq<UserBody>, res, next) => {
        // check password
        const isMatch = await req.user!.validatePassword(req.body.password);

        // if password not match throw error
        if (!isMatch) {
            return next(httpError(401, 'password is not match'));
        }
        req.user!.email = req.body.email;
        req.user!.name = req.body.name;
        req.user!.username = req.body.username;
        const updateUser = await req.user!.save();
        sendResponse(res, 200, { data: updateUser }, '');
    }
);

export const updatePassword = catchError(
    async (req: AuthReq<IUpdatePassword>, res, next) => {
        // check password
        const isMatch = await req.user!.validatePassword(req.body.password);

        // if password not match throw error
        if (!isMatch) {
            return next(httpError(401, 'password is not match'));
        }
        req.user!.password = req.body.newPassword;
        const user = await req.user!.save();
        const token = user.generateToken();
        sendResponse(res, 201, { message: 'password updated' }, token);
    }
);
export const updateAvater = catchError(async (req: AuthReq<{}>, res, next) => {
    const domain = url.format({
        protocol: req.protocol,
        host: req.get('host'),
    });
    req.user!.avater = `${domain}/${req.file.filename}`;
    await req.user!.save();
    sendResponse(res, 200, {
        message: 'avater updated',
        data: {
            avater: req.user!.avater,
        },
    });
});

export const getMe = catchError(async (req: AuthReq<{}>, res, next) => {
    // const isValidJwt = isJWT(req.params.token);
    // if(!isValidJwt) return next(httpError(401, 'invalid credentials'));
    const user = await req
        .user!.populate(
            'friendsList requests sendRequests',
            'id name username avater'
        )
        .execPopulate();
    sendResponse(res, 200, { data: user });
});

export const sendFriendsRequest = catchError(
    async (req: AuthReq<{}>, res, next) => {
        const { friendId } = req.params;
        // check friend id is valid
        if (!Types.ObjectId.isValid(friendId))
            return next(httpError(403, 'invalid user credentials'));
        // cehck own id
        if (friendId === req.user!.id.toString())
            return next(
                httpError(403, 'can not send friend request your self')
            );
        // find user from DB
        let friend = await User.findById(friendId);
        // chekc have any user
        if (!friend) return next(httpError(404, 'user not exits'));

        const alreadyFriend = friend.friendsList.includes(
            req.user!.id.toString()
        );

        if (alreadyFriend)
            return next(httpError(403, 'your are already friend of this user'));
        // send request before
        const alreadyInRequest = friend.requests.includes(
            req.user!.id.toString()
        );

        if (alreadyInRequest)
            return next(
                httpError(
                    403,
                    'user already in send friend request to this user'
                )
            );

        req.user!.sendRequests.push(friendId);
        friend!.requests.push(req.user!.id);

        await Promise.all([await req.user!.save(), await friend!.save()]);

        sendResponse(res, 200, {
            data: { message: 'successfully send request' },
        });
    }
);

export const acceptFriendsRequest = catchError(
    async (req: AuthReq<{}>, res, next) => {
        const { friendId } = req.params;
        // check friend id is valid
        if (!Types.ObjectId.isValid(friendId))
            return next(httpError(403, 'invalid user credentials'));
        // cehck own id
        if (friendId === req.user!.id.toString())
            return next(
                httpError(403, 'can not accept friend request your self')
            );
        // find user from DB
        let friend = await User.findById(friendId);
        // chekc have any user
        if (!friend) return next(httpError(404, 'user not exits'));

        const alreadyFriend = req.user!.friendsList.includes(friendId);
        if (alreadyFriend)
            return next(httpError(403, 'your are already friend of this user'));
        // send request before
        const hasRequest = req.user!.requests.includes(friendId);

        if (!hasRequest)
            return next(httpError(403, 'friend request not found'));
        // already friend

        req.user!.requests.splice(
            req.user!.requests.findIndex(id => id.toString() === friendId),
            1
        );
        friend!.sendRequests.splice(
            friend!.sendRequests!.findIndex(id => id.toString() === friendId),
            1
        );

        req.user!.friendsList.push(friendId);
        friend.friendsList.push(req.user!.id);

        await Promise.all([await req.user!.save(), await friend!.save()]);

        sendResponse(res, 200, {
            data: { message: 'successfully accept request' },
        });
    }
);

export const cancleRequest = catchError(async (req: AuthReq<{}>, res, next) => {
    const { friendId } = req.params;
    // check friend id is valid
    if (!Types.ObjectId.isValid(friendId))
        return next(httpError(403, 'invalid user credentials'));

    if (friendId === req.user!.id.toString())
        return next(httpError(403, 'can not accept friend request your self'));
    // find user from DB
    let friend = await User.findById(friendId);
    // chekc have any user
    if (!friend) return next(httpError(404, 'user not exits'));

    const alreadyFriend = req.user!.friendsList.includes(friendId);

    if (alreadyFriend)
        return next(httpError(403, 'your are already friend of this user'));

    const hasRequest = req.user!.requests.includes(friendId);
    if (!hasRequest) return next(httpError(403, 'not friend request found'));

    req.user!.requests.splice(
        req.user!.requests.findIndex(id => id.toString() === friendId),
        1
    );
    friend!.sendRequests.splice(
        friend!.sendRequests!.findIndex(id => id.toString() === friendId),
        1
    );

    await Promise.all([await req.user!.save(), await friend!.save()]);
    sendResponse(res, 200, {
        data: { message: 'successfully cancle request' },
    });
});

export const unFriend = catchError(async (req: AuthReq<{}>, res, next) => {
    const { friendId } = req.params;
    // check friend id is valid
    if (!Types.ObjectId.isValid(friendId))
        return next(httpError(403, 'invalid user credentials'));

    if (friendId === req.user!.id.toString())
        return next(httpError(403, 'can not unfriend your self'));
    // find user from DB
    let friend = await User.findById(friendId);
    // chekc have any user
    if (!friend) return next(httpError(404, 'user not found'));

    const hasFriend = req.user!.friendsList.findIndex(
        id => id.toString() === friendId
    );
    if (hasFriend === -1)
        return next(httpError(403, 'you are not friend of the user'));

    req.user!.friendsList.splice(hasFriend, 1);
    friend.friendsList.splice(
        friend.friendsList.findIndex(id => id.toString() === req.user!.id),
        1
    );
    await Promise.all([await req.user!.save(), await friend!.save()]);
    sendResponse(res, 200, {
        data: { message: 'successfully unfriend user' },
    });
});

export const getFriendRequest = catchError(
    // @ts-ignore
    async (req: AuthReq<{}>, res, next) => {}
);
