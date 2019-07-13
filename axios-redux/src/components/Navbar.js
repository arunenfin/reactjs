import React from 'react';
import { Link, withRouter } from "react-router-dom";
import './Navbar.css';

const paths = [
  { pathname: "/", text: "Home" },
  { pathname: "/about", text: "About" },
  { pathname: "/users", text: "Users" }
];

function Navbar(props) {

  const liElems = paths.map(path => {
    const classes = (path.pathname === props.location.pathname) ? "nav-item active" : "nav-item";
    return (
      <li key={path.pathname} className={classes}>
        <Link to={path.pathname} className="nav-link">{path.text}</Link>
      </li>
    )
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {liElems}
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);