import { combineReducers } from "redux";
import codeFragmentReducer from "./codeFragmentReducer";

const reducers = combineReducers({
  codeFragment: codeFragmentReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
