import React from "react";
import logo from "../../assets/logo.svg"
export default function Footer() {


  return (
    <>
    <div className="foote">
      <div className="footer__container">
        <div className="footer__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="footer__links">
          <a href="#" className="footer__link">About</a>
          <a href="#" className="footer__link">Contact</a>
          <a href="#" className="footer__link">FAQ</a>
        </div>
      </div>
    </div>
    </>
  )
}