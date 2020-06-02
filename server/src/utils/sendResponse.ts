import { Response } from 'express';

interface RES<G> {
    status: string;
    [key: string]: G | string | undefined;
    token?: string;
}

class SendResponse<T> {
    private status = '';

    constructor(
        private res: Response,
        private readonly statusCode: number,
        private data: T,
        private token?: string
    ) {}

    static sendRes<D>(
        Res: Response,
        statusCode: number,
        data: D,
        token?: string
    ) {
        return new SendResponse<D>(Res, statusCode, data, token)
            .setStatus()
            .resPosponseObj<D>();
    }

    private setStatus() {
        const { statusCode } = this;
        if (statusCode >= 200 && statusCode < 300) this.status = 'success';
        else if (statusCode >= 300 && statusCode < 500) this.status = 'fail';
        else this.status = 'error';
        return this;
    }

    private resPosponseObj<J>() {
        const { token, res, statusCode } = this;
        const buildResponse: RES<J> = {
            status: this.status,
            ...this.data,
        };
        if (token) {
            res.cookie('token', token);
            buildResponse.token = token;
        }
        res.status(statusCode).json(buildResponse);
        return buildResponse;
    }
}

export default SendResponse.sendRes;
