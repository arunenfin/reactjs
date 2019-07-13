import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSidebar } from '../store/actions';
import MaterialIcon from '@material/react-material-icon';
class Footer extends Component {

  _toggleSidebar = () => {
    this.props.toggleSidebar();
  }

  render() {
    const sidebarIcon = this.props.sidebarOpen ? 'chevron_left' : 'chevron_right';

    return (
      <div className="clearfix">
        <div className="float-left">
          <button type="button" className="btn btn-outline-secondary" onClick={this._toggleSidebar}>
            <MaterialIcon className="align-bottom" icon={sidebarIcon} />
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