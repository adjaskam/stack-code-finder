import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import DatabaseError from "../errors/DatabaseError";
import { UserDocument } from "./model-types";
interface UserInterface extends Model<UserDocument> {
  login: (email: string, password: string) => UserDocument;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  const registeredUser = await this.constructor.findOne({ email: user.email });
  if (registeredUser) {
    throw new DatabaseError("User with this email is already registered");
  }
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (user) {
    const authResult = await bcrypt.compare(password, user.password);
    if (authResult) return user;
    throw new DatabaseError("Bad credentials");
  }
  throw new DatabaseError("Account not found");
};

const User = mongoose.model<UserDocument, UserInterface>(
  "UserModel",
  UserSchema
);

export default User;
