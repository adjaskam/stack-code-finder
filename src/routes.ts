import { Express } from "express";
import {
  fetchQuestionsHandler,
  getAllQuestionsHandler,
  getAllQuestionsForTagHandler,
  deleteAllQuestionsHandler,
  deleteQuestionByQuestionIdHandler,
} from "./controller/questionsController";
import { fetchExampleDataFromStack } from "./api";

export default function (app: Express) {
  app.post("/api/questions", fetchQuestionsHandler);
  app.get("/api/questions/:tag", getAllQuestionsForTagHandler);
  app.get("/api/questions", getAllQuestionsHandler);
  app.delete("/api/questions", deleteAllQuestionsHandler);
  app.delete("/api/questions/:questionId", deleteQuestionByQuestionIdHandler);
}
