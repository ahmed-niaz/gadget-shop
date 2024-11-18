import useAuth from "../../hooks/useAuth";
import profile from "../../assets/user.png";
import { Link } from "react-router-dom";
const UserDropdown = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button">
        <div className="avatar">
          <div className="w-12 rounded-xl">
            <img
                className="w-12"
              src={user?.photoURL || profile}
            />
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <Link to='/dashboard/overview'>Dashboard</Link>
        </li>
        <li>
          <Link onClick={logout}>logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
