import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./AppContainer";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./state";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-notifications/lib/notifications.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
