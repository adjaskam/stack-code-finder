import mongoose, { Schema, Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

export interface UserEntity {
  email: string;
  password: string;
}

export interface UserDocument extends Document, UserEntity {
  createdAt: Date;
  updatedAt: Date;
}

interface UserInterface extends Model<UserDocument> {
  login: (email: string, password: string) => UserDocument;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Email must be in valid format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Minimum password length is 8 characters"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const authResult = await bcrypt.compare(password, user.password);
    if (authResult) return user;
    throw Error("Bad credentials");
  }

  throw Error("Account not found");
};

const User = mongoose.model<UserDocument, UserInterface>(
  "UserModel",
  UserSchema
);

export default User;
