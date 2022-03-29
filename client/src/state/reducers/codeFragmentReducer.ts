import { Action, CodeFragmentState } from "../actions";
import { ActionType } from "../action-types";

const initialState: CodeFragmentState = {
  codeFragments: [],
};

const reducer = (state: CodeFragmentState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH:
      return { ...state, codeFragments: action.payload.codeFragments };
    default:
      return state;
  }
};

export default reducer;
