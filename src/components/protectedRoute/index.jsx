import { Navigate } from "react-router";
import { getJwtToken } from "../../utils/cookiesUtils";


const ProtectedRoute = ({ children }) => {
  const token = getJwtToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;