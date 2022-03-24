export interface ValidationResult {
  param: string;
  result: string;
}

// keep results of validation process
class ValidationError extends Error {
  validationResults: ValidationResult[];
  constructor(message: string, validationResults: ValidationResult[]) {
    super(message);
    this.validationResults = validationResults;
  }
}

export default ValidationError;
