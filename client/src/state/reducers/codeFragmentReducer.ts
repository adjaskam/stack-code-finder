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
  scraperType: string;
  isLoading: boolean;
  codeFragments: CodeFragment[];
  abortToken: CancelTokenSource | undefined;
  executionTime: number | undefined;
};

const initialState: CodeFragmentState = {
  searchPhrase: "",
  tag: "Java",
  scraperType: "cheerio",
  isLoading: false,
  codeFragments: [],
  abortToken: undefined,
  executionTime: undefined,
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
    case ActionType.SET_SCRAPER_TYPE:
      return {
        ...state,
        scraperType: action.payload,
      };
    case ActionType.SET_EXECUTION_TIME:
      return {
        ...state,
        executionTime: action.payload,
      };
      case ActionType.CLEAR_DATA:
        return {
          ...state,
          codeFragments: [],
          executionTime: undefined
        };
    default:
      return state;
  }
};

export default reducer;
