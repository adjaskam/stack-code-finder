import { UserSessionAction } from "../actions/userSessionActions";
import { UserSessionActionType as ActionType } from "../action-types/userSessionActionTypes";
import { UserSessionStateInterface } from "./types/reducers";

const initialState: UserSessionStateInterface = {
  jwtToken: undefined,
  userEmail: undefined,
  exp: undefined,
};

const reducer = (
  state: UserSessionStateInterface = initialState,
  action: UserSessionAction
) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        jwtToken: undefined,
      };
    default:
      return state;
  }
};

export default reducer;
