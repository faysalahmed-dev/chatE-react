import multer from 'multer';
import httpError from 'http-errors';
import jimp from 'jimp';
import catchError from '@/utils/catchError';
import path from 'path';
import { Types } from 'mongoose';

const storage = multer.memoryStorage();

const limits = {
    // fileSize: 5242880,
    files: 1,
};

export const upload = multer({
    storage,
    limits,
    fileFilter(__, file, callBack) {
        if (file.mimetype.startsWith('image')) {
            callBack(null, true);
        } else {
            callBack(
                httpError(400, 'Not an image ! please upload only image file')
            );
        }
    },
});

export const resizeImage = (folderPath: string) =>
    catchError(async (req, res, next) => {
        const { file } = req;
        if (!file)
            return next(httpError(400, 'meetup sholud have atlest 1 image'));

        const ext = req.file.mimetype.split('/')[1];
        file.filename = `${Types.ObjectId().toHexString()}.${ext}`;
        const img = await jimp.read(file.buffer);
        img.resize(300, jimp.AUTO);
        img.quality(75);
        await img.writeAsync(path.join('public', folderPath, file.filename));
        req.file.filename = `${folderPath}/${file.filename}`;
        next();
    });
