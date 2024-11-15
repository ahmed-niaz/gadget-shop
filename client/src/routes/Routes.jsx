import Root from "../layouts/Root";
import { createBrowserRouter } from "react-router-dom";

import ContactUs from "../pages/ContactUs";
import About from "../pages/About";
import Products from "../pages/Products";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: '/dashboard',
    element: <DashboardLayout/>,
  }
]);
