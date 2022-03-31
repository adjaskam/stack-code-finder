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

export type Action =
  | SetSearchPhraseAction
  | SetTagAction
  | SetLoadingAction
  | FetchCodeFragmentsAction;
