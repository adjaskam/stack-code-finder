import mongoose from "mongoose";

export interface CodeFragmentDocument extends mongoose.Document {
  questionId: String;
  tag: String;
  searchPhrase: String;
  codeFragment: String;
  hashMessage: String;
  createdAt: Date;
  updatedAt: Date;
}

const CodeFragmentSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    tag: { type: String, required: true },
    searchPhrase: { type: String, required: true },
    codeFragment: { type: String, required: true },
    hashMessage: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
// .index({ questionId: 1, userId: 1 }, { unique: true })

const CodeFragment = mongoose.model<CodeFragmentDocument>(
  "CodeFragmentModel",
  CodeFragmentSchema
);

export default CodeFragment;
