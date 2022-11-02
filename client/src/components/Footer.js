import React from "react";
import facebook from "../assets/icons8-facebook-circled-64.png";
import linkedin from "../assets/icons8-linkedin-circled-64.png";
import instagram from "../assets/icons8-instagram-old-50.png";

const Footer = () => {
  return (
    <footer className="footer footer-center p-5 bg-base-200 text-base-content rounded bg-grey-223">
      <div className="flex flex-row items-center justify-center space-x-20">
        <a href="/who-we-are" className="link link-hover">
          Who We Are
        </a>
        <a href="/get-in-touch" className="link link-hover">
          Contact
        </a>
        <a href="/shop" className="link link-hover">
          Shop
        </a>
        <a href="/find-a-rescue" className="link link-hover">
          Find A Rescue
        </a>
      </div>
      <div>
        <div className="flex flex-row items-center justify-center space-x-8 mt-4">
          <a
            href="https://www.facebook.com/rescuechow"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src={facebook} alt="facebook link" />
            </div>
          </a>
          <a
            href="https://www.instagram.com/rescuechow/?igshid=YmMyMTA2M2Y%3D&fbclid=IwAR3H3uyGxsTjFZ_PK75EsFEtzQEwC-N-tuapZ31VMLyFdB1_7bsw0OZePsg"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src={instagram} alt="instagram link" />
            </div>
          </a>
          <div className="flex-shrink-0">
            <a
              href="https://www.linkedin.com/in/terasa-hill-19042818"
              target="_blank"
              rel="noreferrer"
            >
              <img className="h-8 w-8" src={linkedin} alt="linkedin link" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>Copyright &copy;2022 Rescue Chow Powered by T.J.S.S Production</p>
      </div>
    </footer>
  );
};

export default Footer;
