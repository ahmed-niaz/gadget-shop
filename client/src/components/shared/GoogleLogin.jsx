import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import googleIcon from "../../assets/google.png";
const GoogleLogin = () => {
  const navigate = useNavigate();
  const { googleLogin } = useAuth();

  // googleLogin
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Link onClick={handleGoogleLogin}>
      <img src={googleIcon} alt="Google login" className="w-8 h-8" /> {/* Adjust size classes as needed */}
    </Link>
  );
};

export default GoogleLogin;
