// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "./hooks/useAuth";
// import { useEffect } from "react";

// const RequireAdmin = () => {
//     const { auth } = useAuth();
//     const location = useLocation();

    

//     return (
//         auth?.role =='admin'
//             ? <Outlet />
//             :  <Navigate to="/"  /> //unauthorized
                
//     );
   
// }

// export default RequireAdmin;

import React from "react";
import { useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAdmin = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if ( !(auth?.role === 'admin') && !auth) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [auth, location, navigate]);

  return auth?.role == 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAdmin;
