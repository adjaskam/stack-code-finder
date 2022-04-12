import { UserSessionAction } from "../actions/userSessionActions";
import { UserSessionActionType as ActionType } from "../action-types/userSessionActionTypes";
import { UserSessionStateInterface } from "./reducers";

const getJwtToken = () => {
  const sessionString = localStorage.getItem("session");
  let parsedObject = undefined;
  if (sessionString) {
    parsedObject = JSON.parse(sessionString);
  }
  return parsedObject;
};
const initialState: UserSessionStateInterface = {
  jwtToken: getJwtToken(),
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
