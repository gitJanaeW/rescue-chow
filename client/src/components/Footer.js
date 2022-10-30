import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div>
                {/* SMALL LOGO GOES HERE */}
            </div>
            <div>
                <h3><a href="mailto: info@rescuechow.com">info@rescuechow.com</a></h3>
                <Link to="/who-we-are">Who We Are</Link>
                <Link to="/shop">Order Now</Link>
                <Link to="/find-a-rescue">Find A Rescue</Link>
            </div>
            <div>
                <h3>Call <a href="tel:+19057678372">(905) 767-8372</a></h3>
                <a href="https://www.facebook.com/rescuechow" target="_blank" rel="noreferrer">png of facebook logo goes here</a>
            </div>
            <br/>
            <div>
                <p>Copyright &copy;2022 Rescue Chow</p>
                <p>Powered by Rescue Chow</p>
            </div>
        </footer>
    );
};

export default Footer;