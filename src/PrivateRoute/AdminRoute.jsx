import React from "react";
import useAuth from "../Pages/Firebase/Context/useAuth/useAuth";
import useRole from "../Hooks/useRole/useRole";
import Loading from "../Components/Loaidng/Loading";
import Forbidden from "../Components/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoute;
