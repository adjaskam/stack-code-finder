import { Express } from "express";
import {
  fetchCodeFragmentsHandler,
  getAllCodeFragmentsBySearchPhraseHandler,
  getAllCodeFragmentsHandler,
  deleteAllCodeFragmentsHandler,
} from "./controller/codeFragmentController";

import {
  registerUserHandler,
  loginUserHandler,
} from "./controller/authController";
import { check } from "express-validator";
import { checkUserAuthStatus } from "./middleware/checkUserAuthStatus";

export default function (app: Express) {
  const authCheck = [
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
  // auth routes
  app.post("/api/register", authCheck, registerUserHandler);
  app.post("/api/login", authCheck, loginUserHandler);

  // codefragments routes
  app.post(
    "/api/codefragments",
    checkUserAuthStatus,
    [
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
    fetchCodeFragmentsHandler
  );
  app.get(
    "/api/codefragments/:searchPhrase",
    [
      check("searchPhrase")
        .trim()
        .isLength({ min: 3 })
        .withMessage(
          "searchPhrase must be a valid string with minimal length of 3 digits"
        ),
    ],
    getAllCodeFragmentsBySearchPhraseHandler
  );
  app.get("/api/codefragments", getAllCodeFragmentsHandler);
  app.delete("/api/codefragments", deleteAllCodeFragmentsHandler);
}
