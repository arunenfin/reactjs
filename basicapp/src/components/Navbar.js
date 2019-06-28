import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar(props) {
  let pages = { home: "", about: "" };
  pages[props.page] = "active";

  return (
    <div>
      <ul>
        <li><Link to="/" className={ pages.home }>Home</Link></li>
        <li><Link to="/about" className={ pages.about }>About</Link></li>
      </ul>
      <hr />
    </div>
  );
}

export default Navbar;