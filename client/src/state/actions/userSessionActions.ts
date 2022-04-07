import { UserSessionActionType as ActionType } from "../action-types/userSessionActionTypes";
import { UserSessionStateInterface } from "../reducers/types/reducers";
interface LoginAction {
  type: ActionType.LOGIN;
  payload: UserSessionStateInterface;
}

interface LogoutAction {
  type: ActionType.LOGOUT;
}

export type UserSessionAction = LoginAction | LogoutAction;
