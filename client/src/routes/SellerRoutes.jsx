import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import Loading from "../components/shared/Loading";
import useUserData from "../hooks/useUserData";

const SellerRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role } = useUserData();
  const location = useLocation();
  if (loading || !role) return <Loading />;
  if (user && role === "seller") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

SellerRoutes.propTypes = {
  children: PropTypes.element,
};
export default SellerRoutes;
