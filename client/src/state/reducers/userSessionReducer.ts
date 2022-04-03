import { Action } from "../actions";
import { ActionType } from "../action-types";

type UserSessionState = {
  jwtToken: string | undefined;
};

const initialState: UserSessionState = {
  jwtToken: localStorage.getItem('jwtToken') || undefined
};

const reducer = (state: UserSessionState = initialState, action: Action) => {
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
