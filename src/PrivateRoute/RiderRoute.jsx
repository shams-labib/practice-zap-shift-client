import React from "react";
import useAuth from "../Pages/Firebase/Context/useAuth/useAuth";
import Loading from "../Components/Loaidng/Loading";
import useRole from "../Hooks/useRole/useRole";
import Forbidden from "../Components/Forbidden/Forbidden";

const RiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "rider") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default RiderRoute;
