import { Outlet } from "react-router-dom";
import HomePageNavbar from "../homepage/HomeNavbar";
import { useContext } from "react";
import AuthContext from "../authContext";
import Navbar from "./Navbar";
// import Navbar from "./Navbar";

const RootLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>

    <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
