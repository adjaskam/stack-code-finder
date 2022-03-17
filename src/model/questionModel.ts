import mongoose from "mongoose";

export interface QuestionDocument extends mongoose.Document {
  questionId: String;
  link: String;
  title: String;
  tag: String;
  codeFragment: String[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true, unique: true },
    codeFragment: { type: [String], required: true },
    link: { type: String, required: true },
    title: { type: String, required: true },
    tag: { type: String, required: true },
  },
  { timestamps: true }
);
// .index({ questionId: 1, userId: 1 }, { unique: true })

const Question = mongoose.model<QuestionDocument>(
  "QuestionModel",
  QuestionSchema
);

export default Question;
