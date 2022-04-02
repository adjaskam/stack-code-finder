import { DocumentDefinition } from "mongoose";
import CodeFragment, { CodeFragmentDocument } from "../../models/code-fragment-model";

export type TaggedCodeFragment = {
  tag: string;
  searchPhrase: string;
  amount: number;
};

export type CodeFragmentsListDto = {
  items: DocumentDefinition<CodeFragmentDocument>[];
  count: number;
};

export type InternalQuestion = {
  questionId: string;
  title: string;
  link: string;
};

export type CodeFragment = {
  questionId: String;
  tag: String;
  searchPhrase: String;
  codeFragment: String;
  hashMessage: String;
};

export type _FetchedQuestion = {
  owner: {
    account_id: string;
  };
  question_id: string;
  link: string;
  title: string;
};

export type _FetchedQuestionsList = {
  items: _FetchedQuestion[];
};

declare module "express" {
  interface Request {
    user?: {
      id: string;
    };
  }
}