import { Dispatch } from "redux";
import { UserSessionActionType as ActionType } from "../action-types/userSessionActionTypes";
import { UserSessionAction as Action } from "../actions/userSessionActions";
import { UserCredentialsInterface } from "../../components/auth/types/auth";
import { State } from "../index";
import axios from "../../api/axiosInstance";

export const loginUser = ({ email, password }: UserCredentialsInterface) => {
  return async (
    dispatch: Dispatch<Action>,
    getState: () => State
  ) => {
    try {
      const apiResponse = await axios.post("/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("jwtToken", apiResponse.data);
      dispatch({
        type: ActionType.LOGIN,
        payload: apiResponse.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUser = () => {
  return (dispatch: Dispatch<Action>) => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
};
