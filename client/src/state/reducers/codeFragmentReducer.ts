import { CodeFragmentsAction } from "../actions/codeFragmentsActions";
import { CodeFragmentsActionType as ActionType } from "../action-types/codeFragmentsActionTypes";
import { CodeFragmentState } from "./types/reducers";

const initialState: CodeFragmentState = {
  searchPhrase: "",
  tag: "Java",
  scraperType: "cheerio",
  isLoading: false,
  codeFragments: [],
  abortToken: undefined,
  executionTime: undefined,
  amount: 1,
  page: 0,
  itemsInTotal: 0
};

const reducer = (
  state: CodeFragmentState = initialState,
  action: CodeFragmentsAction
) => {
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
        executionTime: undefined,
        itemsInTotal: 0
      };
    case ActionType.SET_AMOUNT:
      return {
        ...state,
        amount: action.payload
      };
    case ActionType.SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case ActionType.SET_ITEMS_IN_TOTAL:
      return {
        ...state,
        itemsInTotal: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
