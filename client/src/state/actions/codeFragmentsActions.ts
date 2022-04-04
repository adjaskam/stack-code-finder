import { CancelTokenSource } from "axios";
import { CodeFragmentsActionType as ActionType } from "../action-types/codeFragmentsActionTypes";
import { CodeFragment } from "../reducers/codeFragmentReducer";

interface SetSearchPhraseAction {
  type: ActionType.SET_SEARCH_PHRASE;
  payload: string;
}

interface SetTagAction {
  type: ActionType.SET_TAG;
  payload: string;
}

interface SetLoadingAction {
  type: ActionType.SET_LOADING;
}

interface FetchCodeFragmentsAction {
  type: ActionType.FETCH_CODE_FRAGMENTS;
  payload: CodeFragment[];
}

interface SetAbortTokenFetchCodeFragmentsAction {
  type: ActionType.SET_ABORT_TOKEN_FETCH_CODE_FRAGMENTS;
  payload: CancelTokenSource | undefined;
}

interface SetScraperTypeAction {
  type: ActionType.SET_SCRAPER_TYPE;
  payload: string;
}

interface SetExecutionTimeAction {
  type: ActionType.SET_EXECUTION_TIME;
  payload: number;
}

interface ClearDataAction {
  type: ActionType.CLEAR_DATA;
}

export type CodeFragmentsAction =
  | SetSearchPhraseAction
  | SetTagAction
  | SetLoadingAction
  | FetchCodeFragmentsAction
  | SetAbortTokenFetchCodeFragmentsAction
  | SetScraperTypeAction
  | SetExecutionTimeAction
  | ClearDataAction;
