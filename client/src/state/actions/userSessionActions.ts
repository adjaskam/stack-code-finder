import { UserSessionActionType as ActionType } from "../action-types/userSessionActionTypes";

interface LoginAction {
  type: ActionType.LOGIN;
  payload: string;
}

interface LogoutAction {
  type: ActionType.LOGOUT;
}

export type UserSessionAction = LoginAction | LogoutAction;
