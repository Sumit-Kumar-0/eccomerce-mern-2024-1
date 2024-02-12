// Header.js
import React from "react";
import Logo from "../header-comps/Logo";
import NavItem from "../header-comps/NavItem";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <header className="header">
        <Logo />
        <ul className="header__navlist">
          <NavItem to="/" text="home" />
          <NavItem to="/category" text="category" />
          <NavItem to="/register" text="register" />
          <NavItem to="/login" text="login" />
          <NavItem to="/cart" text="cart(0)" />
        </ul>
      </header>
    </div>
  );
};

export default Header;
