import { Document } from 'mongoose';
import { UserI } from '@/model/user/user.interface';

export interface GroupCreateBody {
    groupname: string;
    location: string;
    image: string;
    country: string;
    groupType: 'private' | 'public';
}

export interface GroupI extends GroupCreateBody, Document {
    slug: string;
    fans: Array<string | UserI>;
    admin: UserI;
}
