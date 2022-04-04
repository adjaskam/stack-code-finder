import { UserSessionAction } from "../actions/userSessionActions";
import { UserSessionActionType as ActionType } from "../action-types/userSessionActionTypes";

type UserSessionState = {
  jwtToken: string | undefined;
};

const initialState: UserSessionState = {
  jwtToken: localStorage.getItem("jwtToken") || undefined,
};

const reducer = (
  state: UserSessionState = initialState,
  action: UserSessionAction
) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        jwtToken: action.payload,
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
