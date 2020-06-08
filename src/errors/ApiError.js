class ApiError extends Error {
    constructor(statusCode = 500, message) {
        super(message);
        this.statusCode = statusCode;
        this.body = { status: statusCode, message: message };
        Error.captureStackTrace(this, ApiError);
    }
}

export default ApiError;
