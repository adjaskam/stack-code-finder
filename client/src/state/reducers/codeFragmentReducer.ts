import { Action } from "../actions";
import { ActionType } from "../action-types";
import { CancelTokenSource } from "axios";

export type CodeFragment = {
  questionId: string;
  tag: string;
  searchPhrase: string;
  codeFragment: string;
  hashMessage: string;
};

type CodeFragmentState = {
  searchPhrase: string;
  tag: string;
  isLoading: boolean;
  codeFragments: CodeFragment[];
  abortToken: CancelTokenSource | undefined;
};

const initialState: CodeFragmentState = {
  searchPhrase: "",
  tag: "Java",
  isLoading: false,
  codeFragments: [],
  abortToken: undefined
};

const reducer = (state: CodeFragmentState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_SEARCH_PHRASE:
      return {
        ...state,
        searchPhrase: action.payload,
      };
    case ActionType.SET_TAG:
      return {
        ...state,
        tag: action.payload,
      };
    case ActionType.SET_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case ActionType.FETCH_CODE_FRAGMENTS:
      return {
        ...state,
        codeFragments: action.payload,
      };
    case ActionType.SET_ABORT_TOKEN_FETCH_CODE_FRAGMENTS:
      return {
        ...state,
        abortToken: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
