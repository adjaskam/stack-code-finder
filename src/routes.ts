import { Express } from "express";
import {
  fetchQuestionsHandler,
  getAllQuestionsHandler,
  getAllQuestionsForTagHandler,
  deleteAllQuestionsHandler,
  deleteQuestionByQuestionIdHandler,
  getCodeFragmentHandler
} from "./controller/questionsController";
import { fetchExampleDataFromStack } from "./api";

export default function (app: Express) {
  app.get("/healthcheck", fetchExampleDataFromStack);

  app.post("/api/questions", fetchQuestionsHandler);
  app.get("/api/questions/:tag", getAllQuestionsForTagHandler);
  app.get("/api/questions", getAllQuestionsHandler);
  app.delete("/api/questions", deleteAllQuestionsHandler);
  app.delete("/api/questions/:questionId", deleteQuestionByQuestionIdHandler);

  app.get("/api/code", getCodeFragmentHandler);
}
