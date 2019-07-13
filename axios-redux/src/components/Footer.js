import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSidebar } from '../store/actions';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
class Footer extends Component {

  _toggleSidebar = () => {
    this.props.toggleSidebar();
  }

  render() {
    return (
      <div className="clearfix">
        <div className="float-left">
          <button type="button" className="btn btn-outline-secondary" onClick={this._toggleSidebar}>
            { this.props.sidebarOpen ? <ArrowLeftCircle size="24" /> : <ArrowRightCircle size="24" /> }
          </button>
        </div>
        <div className="float-right">
          <span>&copy; 2019 example.com</span>
        </div>
      </div>
    )
  }
}

// map sidebarOpen property from redux store to props
function mapStateToProps(state) {
  return {
    sidebarOpen: state.sidebarOpen
  }
}

// map toggleSidebar function to props
const mapDispatchToProps = {
  toggleSidebar: toggleSidebar
}

// connect redux store to component
export default connect(mapStateToProps, mapDispatchToProps)(Footer);