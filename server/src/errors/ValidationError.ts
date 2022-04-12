export interface ValidationResult {
  param: string;
  result: string;
}

class ValidationError extends Error {
  validationResults: ValidationResult[];
  constructor(message: string, validationResults: ValidationResult[]) {
    super(message);
    this.validationResults = validationResults;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export default ValidationError;
