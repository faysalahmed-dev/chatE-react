import { Schema, SchemaTypes } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export default new Schema(
    {
        name: {
            type: String,
            minlength: [4, 'name too short'],
            trim: true,
            required: [true, 'name required'],
            validate: {
                validator(value: string) {
                    return /^[a-zA-Z ]+$/.test(value.trim());
                },
                message: () => `name only contain alpha value`,
            },
        },
        username: {
            type: String,
            trim: true,
            required: [true, 'user name required'],
            validate: {
                validator(username: string) {
                    return /^[a-zA-Z0-9]{5,}$/.test(username);
                },
                message: () =>
                    `invalid user name format should be (letter or number and 6 characters long)`,
            },
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, 'email required'],
            validate: [isEmail, 'invalid email address'],
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            minlength: [6, 'password is too short min {{VALUE}} character '],
            select: false,
        },
        avater: {
            type: String,
            default: 'chat-app-images/default-avater.png',
        },
        changePasswordAt: Date,
        sendRequests: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
        requests: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
        friendsList: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
        favoriteGroups: {
            type: [
                {
                    type: SchemaTypes.ObjectId,
                    ref: 'Group',
                },
            ],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
