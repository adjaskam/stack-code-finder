import User, { UserEntity } from "../model/userModel";
import log from "../logger";

export async function createUser(
  user: UserEntity
): Promise<UserEntity | null> {
  try {
    return await User.create(user);
  } catch (error) {
    log.error(error.message);
    return null;
  }
}

export async function loginUser(
  user: UserEntity
): Promise<UserEntity | null> {
  try {
    return await User.login(user.email, user.password);
  } catch (error) {
    log.error(error.message);
    return null;
  }
}
