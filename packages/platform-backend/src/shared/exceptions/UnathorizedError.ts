import { ApiError } from "./ApiError";

export class UnathorizedError extends ApiError {
    constructor() {
        super(401, 'User not found');
    }
}