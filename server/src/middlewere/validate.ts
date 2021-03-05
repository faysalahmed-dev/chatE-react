import httpError from 'http-errors';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

// validate user data when user went to create new account
export const validateInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // check validate result if no error call next to countine
    // const errors = validationResult(req).errors;
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const mappedErrors = errors.mapped();

    const error = Object.keys(mappedErrors).reduce((err, key) => {
        err[key] = mappedErrors[key].msg;
        return err;
    }, {} as { [key: string]: string });
    const errorObj = httpError(400, 'invalid form values');
    errorObj.data = error;
    next(errorObj);
};
