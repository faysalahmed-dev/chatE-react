import { Model, Document } from 'mongoose';

interface UserI {
    name: string;
    username: string;
    email: string;
}
export interface UserPublicPropertyI extends UserI {
    _id: string;
}

export interface UserSchemaI extends Document, UserI {
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
