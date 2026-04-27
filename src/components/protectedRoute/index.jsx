import { Navigate } from "react-router";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import Header from "../header";
import SidePanel from "../sidePanel";
import { getJwtToken } from "../../utils/cookiesUtils";
import "./index.css";


const ProtectedRoute = ({ children }) => {
  const token = getJwtToken();
  const { isDark } = useContext(ThemeContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`app-route-wrapper ${isDark ? "dark" : ""}`}>
      <Header />
      <div className="app-layout-container">
        <SidePanel isDark={isDark} />
        <div className="app-main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;