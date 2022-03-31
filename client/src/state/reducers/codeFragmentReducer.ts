import { Action } from "../actions";
import { ActionType } from "../action-types";

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
};

const initialState: CodeFragmentState = {
  searchPhrase: "",
  tag: "",
  isLoading: false,
  codeFragments: [],
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
    default:
      return state;
  }
};

export default reducer;
