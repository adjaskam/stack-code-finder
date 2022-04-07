import CodeFragmentsContainer from "../code-fragments/CodeFragmentsContainer";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  NotAuthorizedOnlyRoute,
  RequiredAuthRoute,
} from "../shared/RequiredAuth";
import LoginContainer from "../auth/LoginContainer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequiredAuthRoute>
            <CodeFragmentsContainer />
          </RequiredAuthRoute>
        }
      />
      <Route
        path="/entry"
        element={
          <NotAuthorizedOnlyRoute>
            <LoginContainer />
          </NotAuthorizedOnlyRoute>
        }
      />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default AppRoutes;
