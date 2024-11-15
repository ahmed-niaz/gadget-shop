import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/shared/Loading";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types'
const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading />;
  if (user) return children;
  return <Navigate to="/" state={{ from: location }} replace />;
};
PrivateRoutes.propTypes = {
    children: PropTypes.element,
  };
export default PrivateRoutes;
