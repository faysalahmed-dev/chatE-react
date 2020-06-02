import fs from 'fs';
import { join } from 'path';
import express from 'express';
import morgan from 'morgan';

import userRoute from '@/routes/user.route';

import ErrorController from '@/controllers/error.ctrl';

const app = express();

if (process.env.NODE_ENV === 'production') {
    const logfilePath = join(__dirname, '..', '..', '.log');
    const logFile = fs.createWriteStream(logfilePath, { flags: 'a' });
    app.use(morgan('combined', { stream: logFile }));
} else {
    app.use(morgan('dev'));
}

app.use(express.static(join(__dirname, '..', '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api route
app.use('/api/v1/user', userRoute);

app.use(ErrorController);

export default app;
