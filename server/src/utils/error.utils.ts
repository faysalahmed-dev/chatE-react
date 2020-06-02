import httpError from 'http-errors';
// handle Data Base Cast Error
export const handleCaseErrorDB = (err: any) =>
    httpError(400, `Invalid ${err.path} : ${err.value}`);

// handle Duplicate Fields Name
export const handleDuplicateFieldsDB = (err: any) => {
    const value = err.errmsg.match(/"(.*?)"/g)[0];

    return httpError(
        400,
        `Duplicate Fidels value ${value}. Please use another Value `
    );
};

// handler MongoDB validation Error
export const handleValidationDB = (err: { errors: string }) => {
    const errorMsg = Object.values(err.errors).reduce(
        (acc, val) => `${acc}. ${val}`,
        ''
    );
    return httpError(400, errorMsg);
};
export const handleInvalidToken = () => {
    return httpError(401, 'Invalid Token! Please Login Again');
};
export const handleTokenExpired = () => {
    return httpError(400, 'Token Expired Please login again');
};
