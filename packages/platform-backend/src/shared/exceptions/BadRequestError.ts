import { ApiError } from "./ApiError";

export class BadRequestError extends ApiError {
    constructor(message: string, errors = []) {
        super(400, message, errors);
    }
}