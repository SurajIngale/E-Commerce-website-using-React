import React, { useContext } from "react";
import "../assets/Usercss/header.css";
import { NavLink } from "react-router-dom";
import CartContext from "./cartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../authContext";

const Header = () => {
  const { cart } = useContext(CartContext);
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);


  return (
   <div>
     <div className="navHeader">
      <h1>GadgetHub</h1>
      <div className="navLinks">
        <ul>
        <li className="me-2">
            <div className="search-container">
              <input type="search" placeholder="Search" className="search-bar" />
            </div>
          </li>
        <li className="me-2">
            <NavLink to="/user/user-profile"><FontAwesomeIcon icon={faUser}/> {user?.name}</NavLink>
          </li>
          <li>
            <NavLink to="/user/home">Home</NavLink>
          </li>
          
         
          <li>
            <NavLink to="/cart">Cart ({cart.length})</NavLink>
          </li>
          <li className="me-5">
            <NavLink to="/home" onClick={logout}>Logout</NavLink>
          </li>
        </ul>
      </div>
    </div>
    <div className="categoryHeader">
      <li>
            <NavLink to="/user/smartphone">SmartPhones</NavLink>
          </li>
          <li>
            <NavLink to="/user/tabs">Tabs</NavLink>
          </li>
          <li>
            <NavLink to="/user/laptops">Laptops</NavLink>
          </li>
          <li>
            <NavLink to="/user/tv">Tvs</NavLink>
          </li>
          <li>
            <NavLink to="/user/headphones">Headphones</NavLink>
          </li>
          <li>
            <NavLink to="/user/watches">Watches</NavLink>
          </li>
      </div>
   </div>
    
  );
};

export default Header;
