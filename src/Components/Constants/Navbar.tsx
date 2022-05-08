import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import cogWheel from "../../img/cog.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ avatar }: any) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className="navular d-flex justify-content-end">
        <div>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <div>
          <Link to="/user">
            <img className="settings-ico" src={cogWheel} alt="settings" />
          </Link>
          <Link to="/user">
            <img className="user-ico" src={avatar.avatar_url} alt="user icon" />
          </Link>
        </div>
      </div>
      <nav className={sidebar ? 'nav-menu-active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
              <li className='navbar-toggle'>
                  <Link to='#' className='menu-bars'>
                      <AiIcons.AiOutlineClose />
                  </Link>
              </li>
          </ul>
      </nav>
    </>
  );
}
