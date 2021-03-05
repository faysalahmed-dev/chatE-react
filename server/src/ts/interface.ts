import { UserBaseI, UserModelI } from '@/model/user/user.interface';
import { Request } from 'express';

export interface PostBody {
    title: string;
    body: string;
}

export interface IPublicUserInfo {
    name: string;
    email: string;
    username: string;
}

export interface UserBody extends IPublicUserInfo {
    password: string;
}

export interface IUpdatePassword {
    password: string;
    newPassword: string;
}

export interface IUpdateMe extends IPublicUserInfo {
    password: string;
}

export interface IReq<Body = {}, User = null> extends Request {
    user?: User | null;
    body: Body;
}

export interface ReqBody<T> extends Request {
    body: T;
}

export interface AuthReq<T> extends ReqBody<T> {
    user?: UserBaseI;
}
