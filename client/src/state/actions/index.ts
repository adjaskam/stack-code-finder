import { CancelTokenSource } from "axios";
import { ActionType } from "../action-types/index";
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

export type Action =
  | SetSearchPhraseAction
  | SetTagAction
  | SetLoadingAction
  | FetchCodeFragmentsAction
  | SetAbortTokenFetchCodeFragmentsAction;
