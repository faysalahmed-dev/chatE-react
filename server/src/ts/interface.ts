import { Request } from 'express';

export interface PostBody {
   title: string;
   body: string;
}

export interface IPublicUserInfo {
   name: string;
   email: string;
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
