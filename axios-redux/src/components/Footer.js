import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullScreenIcon from '../assets/images/fullscreen.svg';
import FullScreenExitIcon from '../assets/images/fullscreen_exit.svg';

class Footer extends Component {
  render() {
    return (
      <div className="clearfix">
        <div className="float-left">
          &copy; 2019 example.com
        </div>
        <div className="float-right">
          <img src={this.props.fullScreen ? FullScreenExitIcon : FullScreenIcon} alt="Fullscreen" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    fullScreen: state.fullScreen
  }
}

export default connect(mapStateToProps)(Footer);