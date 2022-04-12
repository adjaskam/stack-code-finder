import { Document } from "mongoose";

export interface CodeFragmentEntity {
  questionId: string;
  tag: string;
  searchPhrase: string;
  codeFragment: string;
  hashMessage: string;
  usersOwn?: string[];
}
export interface CodeFragmentDocument extends CodeFragmentEntity, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserEntity {
  email: string;
  password: string;
}

export interface UserDocument extends Document, UserEntity {
  createdAt: Date;
  updatedAt: Date;
}
