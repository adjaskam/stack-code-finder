import { Express } from "express";
import {
  fetchCodeFragmentsHandler,
  getAllCodeFragmentsBySearchPhraseHandler,
  getAllCodeFragmentsHandler,
  deleteAllCodeFragmentsHandler,
} from "./controller/codeFragmentController";
import { check } from "express-validator";

export default function (app: Express) {
  app.post(
    "/api/codefragments",
    [
      check("tag")
        .trim()
        .isLength({ min: 3 })
        .withMessage(
          "searchPhrase must be a valid string with minimal length of 3 digits"
        )
        .bail(),
      check("searchPhrase")
        .trim()
        .isLength({ min: 3 })
        .withMessage(
          "searchPhrase must be a valid string with minimal length of 3 digits"
        )
        .bail(),
      check("amount")
        .trim()
        .isNumeric()
        .withMessage("amount must be numeric.")
        .bail(),
    ],
    fetchCodeFragmentsHandler
  );
  app.get(
    "/api/codefragments/:searchPhrase",
    [
      check("searchPhrase")
        .trim()
        .exists()
        .withMessage("searchPhrase property is obligatory")
        .isLength({ min: 3 })
        .withMessage(
          "searchPhrase must be a valid string with minimal length of 3 digits"
        )
        .bail(),
    ],
    getAllCodeFragmentsBySearchPhraseHandler
  );
  app.get("/api/codefragments", getAllCodeFragmentsHandler);
  app.delete("/api/codefragments", deleteAllCodeFragmentsHandler);
}
