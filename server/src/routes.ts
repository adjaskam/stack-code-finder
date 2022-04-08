import { Express } from "express";
import {
  fetchCodeFragmentsHandler,
  getAllCodeFragmentsBySearchPhraseHandler,
  getAllCodeFragmentsHandler,
  deleteAllCodeFragmentsHandler,
  getAllCodeFragmentsForUserHandler,
  deleteCodeFragmentHandler,
} from "./controllers/code-fragment-controller";

import { handleApplicationError } from "./middlewares/error-handler-middleware";
import {
  registerUserHandler,
  loginUserHandler,
} from "./controllers/auth-controller";
import {
  credentialsValidationSchema,
  fetchCodeFragmentsValidationSchema,
  validate,
  fetchCodeFragmentsBySearchPhraseValidationSchema,
  fetchAllOwnCodeFragmentsSchema,
  deleteCodeFragmentByHashMessageValidationSchema
} from "./middlewares/validators";
import { checkUserAuthStatus } from "./middlewares/auth-middleware";

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
    checkUserAuthStatus,
    fetchCodeFragmentsHandler
  );
  app.get(
    "/api/codefragments/my",
    fetchAllOwnCodeFragmentsSchema(),
    validate,
    checkUserAuthStatus,
    getAllCodeFragmentsForUserHandler
  );
  app.get(
    "/api/codefragments/:searchPhrase",
    fetchCodeFragmentsBySearchPhraseValidationSchema(),
    validate,
    getAllCodeFragmentsBySearchPhraseHandler
  );
  app.delete(
    "/api/codefragments/:hashMessage",
    deleteCodeFragmentByHashMessageValidationSchema(),
    validate,
    checkUserAuthStatus,
    deleteCodeFragmentHandler
  );
  app.get("/api/codefragments", getAllCodeFragmentsHandler);
  app.delete("/api/codefragments", deleteAllCodeFragmentsHandler);
  app.use(handleApplicationError);
}
