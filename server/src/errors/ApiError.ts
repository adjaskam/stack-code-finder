class ApiError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message: string): ApiError {
    return new ApiError(message, 400);
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(message, 401);
  }

  static internal(message: string): ApiError {
    return new ApiError(message, 500);
  }

  static scrapperIssue(message: string): ApiError {
    return new ApiError(message, 409);
  }

  static stackApiIssue(message: string): ApiError {
    return new ApiError(message, 409);
  }
}

export default ApiError;
