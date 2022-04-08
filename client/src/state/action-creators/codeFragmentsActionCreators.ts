import { Dispatch } from "redux";
import { CodeFragmentsActionType as ActionType } from "../action-types/codeFragmentsActionTypes";
import { CodeFragmentsAction as Action } from "../actions/codeFragmentsActions";
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

export const setAmount = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_AMOUNT,
      payload: amount,
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
      amount: codeFragment.amount,
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
    } catch (error: any) {
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
    } catch (error: any) {
    } finally {
      dispatch({
        type: ActionType.SET_LOADING,
      });
    }
  };
};
