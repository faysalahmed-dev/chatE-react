import { model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { transformObj } from '../../utils/transform';

import userSchema from './user.schema';
import { UserSchemaI, UserBaseI, UserModelI } from './user.interface';

userSchema.pre<UserSchemaI>('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const salt = await bcryptjs.genSalt(12);
            this.password = await bcryptjs.hash(this.password, salt);
        }
        if (this.isModified('password') && !this.isNew)
            this.changePasswordAt = Date.now() - 1000;
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.validatePassword = function (password: string) {
    return bcryptjs.compare(password, this.password);
};

// generate new webtoken
userSchema.methods.generateToken = function () {
    const { _id: id, username } = this;
    return jwt.sign({ id, username }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRIN || '7d',
    });
};

// verify the token
userSchema.statics.verifyToken = function (token: string) {
    return promisify(jwt.verify)(token, process.env.JWT_PRIVATE_KEY);
};

userSchema.methods.passwordIsChange = function (JWTTimeStamp: number) {
    if (this.changePasswordAt) {
        const changeTimpStamp =
            parseInt(this.changePasswordAt.getTime(), 10) / 1000;
        return JWTTimeStamp < changeTimpStamp;
    }
    // false mean password not change;
    return false;
};
//@ts-ignore
userSchema.options.toJSON.transform = transformObj;

const User = model<UserBaseI, UserModelI>('User', userSchema);
export default User;
