import { model } from 'mongoose';
import groupSchema from '@/model/group/group.schema';
import { GroupI } from './group.interface';
import { transformObj } from '../../utils/transform';

import slugify from 'slugify';

groupSchema.pre<GroupI>('save', function (next) {
    this.slug = slugify(this.groupname, {
        replacement: '-',
        lower: true,
        strict: true,
    });

    next();
});
//@ts-ignore
groupSchema.options.toJSON.transform = transformObj;
const Club = model<GroupI>('group', groupSchema);
export default Club;
