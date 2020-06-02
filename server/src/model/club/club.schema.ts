import { Schema } from 'mongoose';

export default new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'club name required'],
        },
        country: {
            type: String,
            trim: true,
            required: [true, 'group country required'],
        },
        image: {
            type: String,
            trim: true,
            default: 'default.jpg',
        },
        fans: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        admin: {
            type: Schema.Types.ObjectId,
            required: [true, 'club should have admin'],
        },
    },
    {
        autoIndex: true,
        timestamps: true,
    }
);
