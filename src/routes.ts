import { Express } from "express";
import {
  fetchQuestionsHandler,
  getAllQuestionsHandler,
  getAllQuestionsForTagHandler,
} from "./controller/questionsController";
import { fetchExampleDataFromStack } from "./api";

export default function (app: Express) {
  app.get("/healthcheck", fetchExampleDataFromStack);
  app.post("/api/questions", fetchQuestionsHandler);
  app.get("/api/questions/:tag", getAllQuestionsForTagHandler);
  app.get("/api/questions", getAllQuestionsHandler);
}
