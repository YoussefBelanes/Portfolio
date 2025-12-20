import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../auth/adminAuth";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear admin session
    logoutAdmin();

    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}

export default Logout;
