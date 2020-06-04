import express from 'express';

import { loginUser, logoutUser, registerUser, getMe } from '@/controllers/user.ctrl';

import { validateInput } from '@/middlewere/validate';

import {
    singupBodyValidate,
    loginBodyValidate,
} from '@/utils/validateBody.utils';
import { isAuthenticated } from '@/middlewere/isAuthenticated';

import User from '@/model/user';

const router = express.Router();

//==>  /user/register
router.get('/auth-user',isAuthenticated, getMe)
router.post('/register', singupBodyValidate, validateInput, registerUser);
router.post('/login', loginBodyValidate, validateInput, loginUser);

export default router;
