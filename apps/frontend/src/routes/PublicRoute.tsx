import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicLayout = () => {
  const { user , loading } = useAuth();

  if(loading) return null;
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicLayout;