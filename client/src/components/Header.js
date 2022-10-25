import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-green-200">
      <h1>NavLogo</h1>
      <Link to="/">Home</Link>
      <Link to="/who-we-are">Who We Are</Link>
      <Link to="/shop">Order Now</Link>
      <Link to="/find-a-rescue">Find A Rescue</Link>
      <Link to="/get-in-touch">Get In Touch</Link>
      <Nav></Nav>
    </header>
  );
};

export default Header;
