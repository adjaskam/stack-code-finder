import { Action, CodeFragmentMeta } from "../actions";
import { ActionType } from "../action-types";

const initialState: CodeFragmentMeta = {
  searchPhrase: "",
  tag: "",
};

const reducer = (state: CodeFragmentMeta = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH:
      return {
        ...state,
        searchPhrase: action.payload.searchPhrase,
        tag: action.payload.tag,
      };
    default:
      return state;
  }
};

export default reducer;
