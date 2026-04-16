import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authcontext } from "../context/authcontext";

function useAuthStatus() {
  const { isAuthenticated } = useContext(authcontext);
  return isAuthenticated;
}

// only logged-in users can access

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStatus();

  console.log("ProtectedRoute auth:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// this PublicRoute → anyone can access

export const PublicRoute = ({ children }) => {
  return children;
};

//  this is SemiProtectedRoute → if logged in, redirect to home

export const SemiProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStatus();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
