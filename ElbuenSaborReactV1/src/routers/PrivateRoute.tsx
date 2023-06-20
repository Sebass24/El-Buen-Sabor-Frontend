import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  isRolPermited: boolean;
  path: string

}

export function PrivateRoute({ children, isRolPermited, path }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? (isRolPermited ? <>{children}</> : <Navigate replace to={path} />) : <Navigate replace to={path} />;
};