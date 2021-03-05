import fs from 'fs';
import { join } from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRoute from '@/routes/user.route';

import ErrorController, { unhandleRoute } from '@/controllers/error.ctrl';

const app = express();

if (process.env.NODE_ENV === 'production') {
    const logfilePath = join(__dirname, '..', '..', '.log');
    const logFile = fs.createWriteStream(logfilePath, { flags: 'a' });
    app.use(morgan('combined', { stream: logFile }));
} else {
    app.use(morgan('dev'));
}
app.use(cors());
app.enable('trust proxy');
app.use(express.static(join(__dirname, '..', '..', 'public')));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRoute);
app.use('*', unhandleRoute);
app.use(ErrorController);

export default app;
