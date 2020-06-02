import { Document } from 'mongoose';

export function transformObj(doc: Document, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    // console.log(doc)
    // console.log(ret)
    // console.log(options)
}
