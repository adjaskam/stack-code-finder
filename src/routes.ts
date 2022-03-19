import { Express } from "express";
import {
  fetchCodeFragmentsHandler,
  getAllCodeFragmentsBySearchPhraseHandler,
  getAllCodeFragmentsHandler,
  deleteAllCodeFragmentsHandler,
} from "./controller/codeFragmentController";

export default function (app: Express) {
  app.post("/api/codefragments", fetchCodeFragmentsHandler);
  app.get("/api/codefragments/:searchPhrase", getAllCodeFragmentsBySearchPhraseHandler);
  app.get("/api/codefragments", getAllCodeFragmentsHandler);
  app.delete("/api/codefragments", deleteAllCodeFragmentsHandler);
}
