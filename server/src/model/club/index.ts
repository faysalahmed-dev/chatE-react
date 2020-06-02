import { model } from 'mongoose';
import clubSchema from '@/model/club/club.schema';
import { ClubI } from './club.interface';

const Club = model<ClubI>('club', clubSchema);
export default Club;
