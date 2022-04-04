import MainCodeFragment from "../MainCodeFragment";
import { Routes, Route, Navigate } from "react-router-dom";
import { NotAuthorizedOnlyRoute, RequiredAuthRoute } from "./RequiredAuth";
import Entry from "../auth/Entry";

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
            <Entry />
          </NotAuthorizedOnlyRoute>
        }
      />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default CustomRoutes;
