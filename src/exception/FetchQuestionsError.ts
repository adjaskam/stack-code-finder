class FetchQuestionError extends Error {
  private errorCode: number;
  constructor(message: string, errorCode: number) {
    super(message);
    this.errorCode = errorCode;
  }

  getErrorCode() {
    return this.errorCode;
  }
}

export default FetchQuestionError;
