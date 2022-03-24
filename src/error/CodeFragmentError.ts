import ApiError from "./ApiError";

class CodeFragmentError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }

  static stackApiIssue(message: string): ApiError {
    return new CodeFragmentError(message);
  }  
  
  static scrapperIssue(message: string): ApiError {
    return new CodeFragmentError(message);
  }
}

export default CodeFragmentError;
