import { Model, Document } from 'mongoose';
import { GroupI } from '@/model/group/group.interface';

export interface UserDataI {
    name: string;
    username: string;
    email: string;
    avater: string;
}
export interface UserI extends UserDataI {
    id: string;
}

export interface UserSchemaI extends Document, UserDataI {
    requests: [UserBaseI | string];
    sendRequests: [UserBaseI | string];
    friendsList: [UserBaseI | string];
    favoriteGroups: [GroupI | string];
    createdAt: string;
    updatedAt: string;
    password: string;
    changePasswordAt: number;
}

export interface UserBaseI extends UserSchemaI {
    generateToken(): string;
    passwordIsChange(timeStemp: number): boolean;
    validatePassword(password: string): Promise<boolean>;
}

export interface UserModelI extends Model<UserBaseI> {
    verifyToken(token: string): Promise<{ id: string; iat: number }>;
}
