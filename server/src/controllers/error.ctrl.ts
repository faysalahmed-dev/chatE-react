/* eslint-disable no-param-reassign */
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
// import logger from '../startup/winston.config';
import sendRes from '../utils/sendResponse';
import {
    handleCaseErrorDB,
    handleDuplicateFieldsDB,
    handleValidationDB,
    handleInvalidToken,
    handleTokenExpired,
} from '../utils/error.utils';

interface Errors extends ErrorRequestHandler {
    message: string;
    status: string;
    statusCode: number;
    stack: any;
}

export const unhandlRoute = (req: Request, res: Response) => {
    sendRes(res, 404, { message: `${req.originalUrl} not found` });
};

export default (
    err: Errors,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {
        return sendRes(res, err.statusCode, {
            error: {
                message: err.message,
                errorStack: err.stack,
            },
        });
    }

    let error = { ...err } as any;
    error.message = err.message;
    error.statusCode = err.statusCode;

    if (error.name === 'CastError') error = handleCaseErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationDB(error);
    if (error.name === 'JsonWebTokenError') error = handleInvalidToken();
    if (error.name === 'TokenExpiredError') error = handleTokenExpired();

    // if (process.env.NODE_ENV === 'production') {
    //     if (error.statusCode >= 500) {
    //         logger.error(err.message, err.stack);
    //     }
    //     if (error.statusCode >= 400 && error.statusCode < 500) {
    //         logger.info(err.message, err.stack);
    //     }
    // }
    sendRes(res, error.statusCode, { error: error.message });
};
