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
import { checkUserAuthStatus } from "./middleware/authMiddleware";
import { API_PATHS, VALIDATORS } from "./middleware/validators";



export default function (app: Express) {
  // auth routes
  app.post(API_PATHS.REGISTER, VALIDATORS.find(item => item.type(API_PATHS.REGISTER))?.validator, registerUserHandler);
  app.post(API_PATHS.LOGIN, authCheck, loginUserHandler);

  // codefragments routes
  app.post(
    API_PATHS.CODE_FRAGMENTS,
    checkUserAuthStatus,,
    fetchCodeFragmentsHandler
  );
  app.get(
    `${API_PATHS.CODE_FRAGMENTS}/:searchPhrase`,
    getAllCodeFragmentsBySearchPhraseHandler
  );
  app.get(API_PATHS.CODE_FRAGMENTS, getAllCodeFragmentsHandler);
  app.delete(API_PATHS.CODE_FRAGMENTS, deleteAllCodeFragmentsHandler);
}
