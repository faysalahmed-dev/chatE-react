import { Document } from 'mongoose';
import { UserPublicPropertyI } from '@/model/user/user.interface';

export interface ClubI extends Document {
    name: string;
    country: string;
    image: string;
    fans: UserPublicPropertyI[];
    admin: UserPublicPropertyI;
}
