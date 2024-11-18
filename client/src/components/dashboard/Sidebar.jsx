import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  BadgePlus,
  HousePlus,
  Loader,
  PackageOpen,
  ScanSearch,
} from "lucide-react";
import useUserData from "./../../hooks/useUserData";

const sellerRoutes = [
  {
    id: 1,
    route: "/dashboard/my-products",
    title: "My Products",
    icon: <PackageOpen />,
  },
  {
    id: 2,
    route: "/dashboard/add-products",
    title: "Add Products",
    icon: <BadgePlus />,
  },
];

const Sidebar = () => {
  const userData = useUserData();
  console.log(userData.role);
  const { logout, loading } = useAuth();
  if (loading) return <Loader />;
  return (
    <main className="bg-slate-100 border-r-2 border-black min-h-screen px-8 py-12">
      <h2 className="text-3xl font-bold">Gadget shop</h2>
      <ul className="py-6 ">
        <li className="btn btn-outline bg-black text-white  w-3/4 mb-4">
          <Link to="/dashboard/overview" className="flex items-center  gap-2">
            <span>
              <ScanSearch />
            </span>{" "}
            Overview
          </Link>
        </li>
        {userData.role === "seller" &&
          sellerRoutes.map((route, idx) => (
            <li
              key={idx}
              className="btn btn-outline bg-black text-white w-3/4 mb-4"
            >
              <Link to={route?.route} className="flex items-center gap-2">
                <span>{route?.icon}</span>
                {route?.title}
              </Link>
            </li>
          ))}
        <li className="btn btn-outline bg-black text-white w-3/4 mb-4">
          <Link to="/" className="flex items-center  gap-2">
            {" "}
            <span>
              <HousePlus />
            </span>
            Home
          </Link>
        </li>
        <li className="btn btn-outline bg-black text-white w-3/4 mb-4">
          <Link to="/">
            <button onClick={logout}>Logout</button>
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default Sidebar;
