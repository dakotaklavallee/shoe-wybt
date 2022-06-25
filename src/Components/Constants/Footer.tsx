import React from "react";
import { ImHome } from "react-icons/im";
import { FaUserAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Footer.css'

export default function Footer() {
  return (
    <div className="d-flex justify-content-center fixed-bottom pb-3 footer-class">
      <div className="row container d-flex justify-content-between mt-2">
        <div className="ml-3">
          <Link to="/">
            <ImHome />
          </Link>
        </div>
        <div>
          <Link to="/likes">
            <FaHeart />
          </Link>
        </div>
        <div className="mr-3">
          <Link to="/user">
            <FaUserAlt />
          </Link>
        </div>
      </div>
    </div>
  );
}
