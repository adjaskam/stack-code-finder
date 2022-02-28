import mongoose from "mongoose";

export interface AppValueDocument extends mongoose.Document {
  description: String;
  value: Number;
}

const AppValueSchema = new mongoose.Schema(
  {
    description: { type: String },
    value: { type: Number },
  },
  { timestamps: true }
);

const AppValue = mongoose.model<AppValueDocument>(
  "AppValueModel",
  AppValueSchema
);

export default AppValue;
