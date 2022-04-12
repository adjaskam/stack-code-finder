import User from "../models/user-model";
import { UserEntity } from "../models/model-types"
import ApiError from "../errors/ApiError";

export async function createUser(user: UserEntity): Promise<UserEntity | null> {
  try {
    return await User.create(user);
  } catch (error) {
    throw ApiError.badRequest(error.message);
  }
}

export async function loginUser(user: UserEntity): Promise<UserEntity | null> {
  try {
    return await User.login(user.email, user.password);
  } catch (error) {
    throw ApiError.unauthorized(error.message);
  }
}

export async function findUserByEmail(
  email: string
): Promise<UserEntity | null> {
  try {
    return await User.findOne({ email: email });
  } catch (error) {
    throw ApiError.badRequest(error.message);
  }
}
