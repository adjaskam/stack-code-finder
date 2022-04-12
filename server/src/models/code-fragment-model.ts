import mongoose, { Schema } from "mongoose";

import { CodeFragmentDocument } from "./model-types";

const CodeFragmentSchema = new Schema(
  {
    questionId: { type: String, required: [true, "QuestionId is required"] },
    tag: { type: String, required: [true, "Tag is required"] },
    searchPhrase: {
      type: String,
      required: [true, "SearchPhrase is required"],
    },
    codeFragment: {
      type: String,
      required: [true, "CodeFragment is required"],
    },
    hashMessage: {
      type: String,
      required: [true, "HashMessage is required"],
      unique: true,
    },
    usersOwn: {
      type: [String],
      required: [true, "UsersOwn is required"],
    },
  },
  { timestamps: true }
);

const CodeFragment = mongoose.model<CodeFragmentDocument>(
  "CodeFragmentModel",
  CodeFragmentSchema
);

export default CodeFragment;
