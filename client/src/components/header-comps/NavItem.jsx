// NavItem.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.css"

const NavItem = ({ to, text }) => {
  return (
    <li className="nav-item">
      <NavLink to={to} className="navlink">
        {text}
      </NavLink>
    </li>
  );
};

export default NavItem;
