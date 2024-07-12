export class Result<T> {
    statusCode: number;
    error: string | null;
    data: T;

    constructor(statusCode: number, error: string | null, data: T) {
        this.statusCode = statusCode;
        this.error = error;
        this.data = data;   
    }
}