import React from "react";
import { Auth } from "../WithAuthorizationStatus";

export interface AuthorizationStatus {
  children: React.Element | React.Element[];
  auth: Auth;
}
