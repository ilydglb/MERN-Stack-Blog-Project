import React from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [auth, location, navigate]);

  return auth ? <Outlet /> : null;
};

export default RequireAuth;
