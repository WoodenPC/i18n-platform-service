export class ApiError extends Error {
    private status: number;
    private errors: any[];

    constructor(status: number, message: string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}