import MainCodeFragment from "../MainCodeFragment";
import Login from "../auth/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { NotAuthorizedOnlyRoute, RequiredAuthRoute } from "./RequiredAuth";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequiredAuthRoute>
            <MainCodeFragment />
          </RequiredAuthRoute>
        }
      />
      <Route
        path="/entry"
        element={
          <NotAuthorizedOnlyRoute>
            <Login />
          </NotAuthorizedOnlyRoute>
        }
      />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default CustomRoutes;
