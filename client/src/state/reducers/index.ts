import { combineReducers } from "redux";
import codeFragmentReducer from "./codeFragmentReducer";
import userSessionReducer from "./userSessionReducer";

const reducers = combineReducers({
  codeFragment: codeFragmentReducer,
  userSession: userSessionReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;
