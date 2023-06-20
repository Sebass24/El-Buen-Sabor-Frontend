import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  isRolPermited: boolean;
  path: string

}

export function PrivateRouteAll({ children, isRolPermited, path }: PrivateRouteProps) {

  return isRolPermited ? <>{children}</> : <Navigate replace to={path} />;
};