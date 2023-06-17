import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  isRolPermited: boolean;
}

export function PrivateRoute({ children, isRolPermited }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? (isRolPermited ? <>{children}</> : <Navigate replace to="/" />) : <Navigate replace to="/" />;
};