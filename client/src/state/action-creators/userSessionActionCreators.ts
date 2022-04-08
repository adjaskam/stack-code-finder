import { Dispatch } from "redux";
import { UserSessionActionType as ActionType } from "../action-types/userSessionActionTypes";
import { CodeFragmentsActionType } from "../action-types/codeFragmentsActionTypes";
import { UserSessionAction as Action } from "../actions/userSessionActions";
import { CodeFragmentsAction } from "../actions/codeFragmentsActions";
import { UserCredentialsInterface } from "../../components/auth/types/auth";
import axios from "../../api/axiosInstance";
import jwtDecode from "jwt-decode";
import {
  UserSessionStateInterface,
  JwtDecodedInterface,
} from "../reducers/types/reducers";

export const loginUser = ({ email, password }: UserCredentialsInterface) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const apiResponse = await axios.post("/login", {
        email: email,
        password: password,
      });

      const decodedJwt: JwtDecodedInterface = jwtDecode(apiResponse.data);
      if (decodedJwt) {
        const sessionObject: UserSessionStateInterface = {
          jwtToken: apiResponse.data,
          userEmail: decodedJwt.id,
          exp: decodedJwt.exp,
        };
        localStorage.setItem("session", JSON.stringify(sessionObject));
        dispatch({
          type: ActionType.LOGIN,
          payload: sessionObject,
        });
      }
    } catch (error: any) {}
  };
};

export const logoutUser = () => {
  return (dispatch: Dispatch<Action | CodeFragmentsAction>) => {
    localStorage.removeItem("session");
    dispatch({
      type: ActionType.LOGOUT,
    });
    dispatch({
      type: CodeFragmentsActionType.CLEAR_DATA,
    });
  };
};
