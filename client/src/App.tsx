import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "./state";

function App() {
  const dispatch = useDispatch();
  const { fetchCodeFragments } = bindActionCreators(actionCreators, dispatch);

  const state = useSelector((state: State) => state.codeFragment);
  return (
    <div className="App">
      <button
        onClick={() => fetchCodeFragments([{ link: "cos", fragment: "cos" }])}
      >
        Click
      </button>
    </div>
  );
}

export default App;
