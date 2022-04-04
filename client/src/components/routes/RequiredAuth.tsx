import { useSelector } from "react-redux";
import { State } from "../../state";
import { Navigate } from "react-router-dom";

export const RequiredAuthRoute = ({ children }: any) => {
  const session = useSelector((state: State) => state.userSession);

  return !session.jwtToken ? <Navigate to="/entry" /> : children;
};

export const NotAuthorizedOnlyRoute = ({ children }: any) => {
  const session = useSelector((state: State) => state.userSession);

  return !session.jwtToken ? children : <Navigate to="/" />;
};
