import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { State } from "../index";
import axios from "../../api/axiosInstance";

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
    const { codeFragment } = getState();
    const body = {
      searchPhrase: codeFragment.searchPhrase.trim(),
      tag: codeFragment.tag,
      amount: 2,
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
