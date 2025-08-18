import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <main>
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Body;
