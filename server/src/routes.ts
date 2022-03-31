import { Express } from "express";
import {
  fetchCodeFragmentsHandler,
  getAllCodeFragmentsBySearchPhraseHandler,
  getAllCodeFragmentsHandler,
  deleteAllCodeFragmentsHandler,
} from "./controller/codeFragmentController";

import { handleApplicationError } from "./middleware/errorHandlerMiddleware";
import {
  registerUserHandler,
  loginUserHandler,
} from "./controller/authController";
import {
  credentialsValidationSchema,
  fetchCodeFragmentsValidationSchema,
  validate,
  fetchCodeFragmentsBySearchPhraseValidationSchema,
} from "./middleware/validators";

export default function (app: Express) {
  // auth routes
  app.post(
    "/api/register",
    credentialsValidationSchema(),
    validate,
    registerUserHandler
  );
  app.post(
    "/api/login",
    credentialsValidationSchema(),
    validate,
    loginUserHandler
  );

  // codefragments routes
  app.post(
    "/api/codefragments",
    fetchCodeFragmentsValidationSchema(),
    validate,
    fetchCodeFragmentsHandler
  );
  app.get(
    "/api/codefragments/:searchPhrase",
    fetchCodeFragmentsBySearchPhraseValidationSchema(),
    validate,
    getAllCodeFragmentsBySearchPhraseHandler
  );
  app.get("/api/codefragments", getAllCodeFragmentsHandler);
  app.delete("/api/codefragments", deleteAllCodeFragmentsHandler);
  
  app.use(handleApplicationError);
}
