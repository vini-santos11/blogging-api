export class Result<T> {
    statusCode: number;
    message: string | null;
    data: T;

    constructor(statusCode: number, message: string | null, data: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}