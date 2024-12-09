import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./homePageNavbar.css"; // Custom styles for the navbar
import "../assets/css/homepage.css"

const HomePageNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container-fluid">
        {/* App Name */}
        <NavLink className="navbar-brand" to="/">
          MyApp
        </NavLink>

        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/#home"
                smooth
                spy
                activeClassName="active-link"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/#shop"
                smooth
                spy
                activeClassName="active-link"
              >
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/#about"
                smooth
                spy
                activeClassName="active-link"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/#contact"
                smooth
                spy
                activeClassName="active-link"
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Login/Register Button */}
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login/Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HomePageNavbar;
