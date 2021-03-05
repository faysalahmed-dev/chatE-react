import express from 'express';

import {
    loginUser,
    registerUser,
    logoutUser,
    updateUser,
    updatePassword,
    updateAvater,
    getMe,
    sendFriendsRequest,
    acceptFriendsRequest,
    cancleRequest,
    unFriend,
    getFriendRequest,
} from '@/controllers/user.ctrl';
import { resizeImage, upload } from '@/middlewere/fileUpload';

import { validateInput } from '@/middlewere/validate';

import {
    singupBodyValidate,
    loginBodyValidate,
    passwordValidate,
    checkImage,
} from '@/utils/validateBody.utils';
import { isAuthenticated } from '@/middlewere/isAuthenticated';

import User from '@/model/user';

const router = express.Router();

// test route
router.get('/', (req, res) => {
    User.find({}).then(data => res.json(data));
});

//==>  /user/register
router.post('/register', singupBodyValidate, validateInput, registerUser);
router.post('/login', loginBodyValidate, validateInput, loginUser);

router.use(isAuthenticated);

router.patch('/update-info', singupBodyValidate, validateInput, updateUser);
router.patch(
    '/update-password',
    passwordValidate,
    validateInput,
    updatePassword
);
router.patch(
    '/update-avater',
    upload.single('avater'),
    checkImage,
    validateInput,
    resizeImage('user-upload'),
    updateAvater
);
router.get('/auth-user', getMe);
router.patch('/send-request/:friendId', sendFriendsRequest);
router.patch('/accept-request/:friendId', acceptFriendsRequest);
router.delete('/cancle-request/:friendId', cancleRequest);
router.delete('/un-friend/:friendId', unFriend);
router.get('/friend-request', getFriendRequest);
export default router;
