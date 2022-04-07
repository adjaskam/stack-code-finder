import { useSelector } from "react-redux";
import { State } from "../../state";
import { Navigate } from "react-router-dom";
import { AuthorizationStatus } from "./types/shared";

export enum Auth {
  None = "None",
  Required = "Required",
}


export const WithAuthorizationStatus = ({
  children,
  auth,
}: AuthorizationStatus) => {
  const session = useSelector((state: State) => state.userSession);
  if (auth === Auth.None) {
    return !session.jwtToken ? children : <Navigate to="/" />;
  } else if (auth === Auth.Required) {
    return !session.jwtToken ? <Navigate to="/entry" /> : children;
  }
};
