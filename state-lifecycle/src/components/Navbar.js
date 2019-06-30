import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar(props) {
  let pages = { home: "nav-item", about: "nav-item" };
  pages[props.page] = pages[props.page] + " active";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className={ pages.home }>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className={ pages.about }>
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;