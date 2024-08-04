import React, { useContext } from "react";
import "../assets/Usercss/header.css";
import { NavLink } from "react-router-dom";
import CartContext from "./cartContext";

const Header = () => {
  const { cart } = useContext(CartContext);

  return (
   <div>
     <div className="navHeader">
      <h1>GadgetHub</h1>
      <div className="navLinks">
        <ul>
          <li>
            <NavLink to="/user/home">Home</NavLink>
          </li>
         
          <li>
            <NavLink to="/cart">Cart ({cart.length})</NavLink>
          </li>
          <li>
            <NavLink to="/home">Logout</NavLink>
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
      </div>
   </div>
    
  );
};

export default Header;
