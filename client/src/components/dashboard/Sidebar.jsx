import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <main className="bg-gray-200 border-r-2 border-black min-h-screen">
      <ul>
        <li>
          <Link to="/">Overview</Link>
        </li>
        <li>
          <Link to="/my-products">My Products</Link>
        </li>
        <li>
          <Link to="/add-products">Add Products</Link>
        </li>
        <li>
          <Link to="/">
            <button onClick={logout}>Logout</button>
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default Sidebar;
