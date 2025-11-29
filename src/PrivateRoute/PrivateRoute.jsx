import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Pages/Firebase/Context/useAuth/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
