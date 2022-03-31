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

export const setLoading = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_LOADING,
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
      const apiResponse = await axios.post("/codefragments", body);
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
