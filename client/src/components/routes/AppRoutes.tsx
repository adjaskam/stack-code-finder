import CodeFragmentsContainer from "../code-fragments/CodeFragmentsContainer";
import { Routes, Route, Navigate } from "react-router-dom";
import { WithAuthorizationStatus } from "../shared/WithAuthorizationStatus";
import LoginContainer from "../auth/LoginContainer";
import { Auth } from "../shared/WithAuthorizationStatus";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WithAuthorizationStatus auth={Auth.Required}>
            <CodeFragmentsContainer />
          </WithAuthorizationStatus>
        }
      />
      <Route
        path="/entry"
        element={
          <WithAuthorizationStatus auth={Auth.None}>
            <LoginContainer />
          </WithAuthorizationStatus>
        }
      />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default AppRoutes;
