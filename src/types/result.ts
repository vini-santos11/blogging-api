export class Result<T> {
    statusCode: number;
    message: string | null;
    data: T;

    constructor(statusCode: number, message: string | null, data: T = null) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}