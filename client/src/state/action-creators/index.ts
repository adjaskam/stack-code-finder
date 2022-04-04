import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { State } from "../index";
import axios from "../../api/axiosInstance";
import { UserCredentialsInterface } from "../../components/auth/types/auth";

export const setSearchPhrase = (searchPhrase: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SEARCH_PHRASE,
      payload: searchPhrase,
    });
  };
};

export const setTag = (tag: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_TAG,
      payload: tag,
    });
  };
};

export const setScraperType = (scraperType: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SCRAPER_TYPE,
      payload: scraperType,
    });
  };
};

export const removeCancelToken = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_ABORT_TOKEN_FETCH_CODE_FRAGMENTS,
      payload: undefined,
    });
  };
};

export const fetchCodeFragments = () => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    dispatch({
      type: ActionType.CLEAR_DATA,
    });
    const { codeFragment } = getState();
    const body = {
      searchPhrase: codeFragment.searchPhrase.trim(),
      tag: codeFragment.tag,
      amount: 1,
      scraperType: codeFragment.scraperType,
    };

    dispatch({
      type: ActionType.SET_LOADING,
    });
    try {
      // set CancelTokenSource in case user want to abort the request
      let CancelToken = axios.CancelToken;
      let source = CancelToken.source();
      dispatch({
        type: ActionType.SET_ABORT_TOKEN_FETCH_CODE_FRAGMENTS,
        payload: source,
      });

      // fetch code fragments from backend API
      const apiResponse = await axios.post("/codefragments", body, {
        cancelToken: source.token,
      });
      dispatch({
        type: ActionType.FETCH_CODE_FRAGMENTS,
        payload: apiResponse.data.items,
      });
      dispatch({
        type: ActionType.SET_EXECUTION_TIME,
        payload: apiResponse.data.executionTime,
      });
    } catch (error) {
    } finally {
      dispatch({
        type: ActionType.SET_LOADING,
      });
      dispatch({
        type: ActionType.SET_ABORT_TOKEN_FETCH_CODE_FRAGMENTS,
        payload: undefined,
      });
    }
  };
};

export const fetchAllOwnCodeFragments = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CLEAR_DATA,
    });
    dispatch({
      type: ActionType.SET_LOADING,
    });

    try {
      // fetch code fragments from backend API
      const apiResponse = await axios.get("/codefragments/my");
      dispatch({
        type: ActionType.FETCH_CODE_FRAGMENTS,
        payload: apiResponse.data.items,
      });
    } catch (error) {
    } finally {
      dispatch({
        type: ActionType.SET_LOADING,
      });
    }
  };
};

export const loginUser = ({ email, password }: UserCredentialsInterface) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
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
    } catch (error) {}
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
