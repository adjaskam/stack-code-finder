import { check } from "express-validator";
import { validationResult } from "express-validator";
import { NextFunction, Response, Request } from "express";
import ValidationError, { ValidationResult } from "../errors/ValidationError";

export function fetchCodeFragmentsValidationSchema() {
  return [
    check("tag")
      .trim()
      .isLength({ min: 3 })
      .withMessage(
        "searchPhrase must be a valid string with minimal length of 3 digits"
      ),
    check("searchPhrase")
      .trim()
      .isLength({ min: 3 })
      .withMessage(
        "searchPhrase must be a valid string with minimal length of 3 digits"
      ),
    check("amount")
      .trim()
      .isInt({ min: 1, max: 10 })
      .withMessage("amount should be greater than 0 and max 10")
      .bail()
      .isNumeric()
      .withMessage("amount must be numeric."),
    check("scraperType")
      .trim()
      .isIn(["puppeteer", "cheerio"])
      .withMessage("scrapperType should be one of: [puppeteer, cheerio]"),
  ];
}

export function fetchCodeFragmentsBySearchPhraseValidationSchema() {
  return [
    check("searchPhrase")
      .trim()
      .isLength({ min: 3 })
      .withMessage(
        "searchPhrase must be a valid string with minimal length of 3 digits"
      ),
  ];
}

export function credentialsValidationSchema() {
  return [
    check("email")
      .trim()
      .isEmail()
      .withMessage("email must have a valid format"),
    check("password")
      .trim()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      })
      .withMessage(
        "password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number "
      ),
  ];
}

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req).array();
  if (errors && errors.length) {
    const validationResults: ValidationResult[] = errors.map((err) => ({
      param: err.param,
      result: err.msg,
    }));
    return next(new ValidationError("Validation error", validationResults));
  }
  next();
}
