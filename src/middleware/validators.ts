import { check } from "express-validator";

export enum API_PATHS {
  LOGIN = "/api/login",
  REGISTER = "/api/register",
  CODE_FRAGMENTS = "/api/codefragments",
}

export const VALIDATORS = [
  {
    type: [API_PATHS.LOGIN, API_PATHS.REGISTER],
    validator: [
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
    ],
  },
  {
    type: [API_PATHS.CODE_FRAGMENTS],
    validator: [
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
      check("amount").trim().isNumeric().withMessage("amount must be numeric."),
    ],
  },
];
