import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdminLoggedIn } from "../../auth/adminAuth";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const location = useLocation();
  const isAllowed = isAdminLoggedIn();

  if (!isAllowed) {
    return (
      <Navigate
        to={redirectPath}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
