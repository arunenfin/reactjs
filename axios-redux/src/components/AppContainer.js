import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

function AppContainer(props) {
  const sideClasses = props.sidebarOpen ? "col-3" : "d-none";
  const mainClasses = props.sidebarOpen ? "col-9" : "col-12";

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={sideClasses}>
          <Sidebar />
        </div>
        <div className={mainClasses}>
          <Navbar />
          {props.children}
          <Footer />
        </div>
      </div>
    </div>
  );
}

// map sidebarOpen property from redux store to props
function mapStateToProps(state) {
  return {
    sidebarOpen: state.sidebarOpen
  }
}

export default connect(mapStateToProps)(AppContainer);