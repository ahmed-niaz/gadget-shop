import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const Root = () => {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen" >
      <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default Root;
