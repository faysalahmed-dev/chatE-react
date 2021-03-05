import { Schema } from 'mongoose';

export default new Schema(
    {
        groupname: {
            type: String,
            trim: true,
            required: [true, 'group name required'],
        },
        location: {
            type: String,
            trim: true,
            required: [true, 'group country required'],
        },
        image: {
            type: String,
            trim: true,
            default: 'default.jpg',
        },
        groupType: {
            type: String,
            enum: ['private', 'public'],
            default: 'private',
        },
        slug: String,
        fans: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'group should have admin'],
        },
    },
    {
        autoIndex: true,
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
