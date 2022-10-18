import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h1>NavLogo</h1>
            <Link to="/">Home</Link>
            <Link to="/who-we-are">Who We Are</Link>
            <Link to="/order-now">Order Now</Link>
            <Link to="find-a-rescue">Find A Rescue</Link>
            <Link to="get-in-touch">Get In Touch</Link>
        </header>
        
    );
};

export default Header;