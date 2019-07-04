import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullScreenIcon from '../assets/images/fullscreen.svg';
import FullScreenExitIcon from '../assets/images/fullscreen_exit.svg';
import { toggleFullScreen } from '../store/actions';

class Footer extends Component {

  fullScreen() {
    let el = document.documentElement;
    let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    rfs.call(el);
  }

  exitFullScreen() {
    let el = document;
    let rfs = el.exitFullscreen || el.webkitExitFullscreen || el.mozCancelFullScreen || el.msExitFullscreen;
    rfs.call(el);
  }

  // click handler for fullscreen icon
  _toggleFullScreen = () => {
    if (this.props.fullScreen) {
      this.exitFullScreen();
    } else {
      this.fullScreen();
    }
    this.props.toggleFullScreen();
  }

  // fullscreenchange event handler
  _handleFullscreenChange = (event) => {
    let elem = event.target;
    let isFullscreen = document.fullscreenElement === elem;
    if ((isFullscreen && !this.props.fullScreen) || (!isFullscreen && this.props.fullScreen)) {
      this.props.toggleFullScreen();
    }
  }

  // add event listeners for fullscreenchange event
  componentDidMount() {
    /* Standard syntax */
    document.addEventListener("fullscreenchange", this._handleFullscreenChange);
    /* Firefox */
    document.addEventListener("mozfullscreenchange", this._handleFullscreenChange);
    /* Chrome, Safari and Opera */
    document.addEventListener("webkitfullscreenchange", this._handleFullscreenChange);
    /* IE / Edge */
    document.addEventListener("msfullscreenchange", this._handleFullscreenChange);
  }

  // remove event listeners when component unmounts
  componentWillUnmount() {
    /* Standard syntax */
    document.removeEventListener("fullscreenchange", this._handleFullscreenChange);
    /* Firefox */
    document.removeEventListener("mozfullscreenchange", this._handleFullscreenChange);
    /* Chrome, Safari and Opera */
    document.removeEventListener("webkitfullscreenchange", this._handleFullscreenChange);
    /* IE / Edge */
    document.removeEventListener("msfullscreenchange", this._handleFullscreenChange);
  }

  render() {
    return (
      <div className="clearfix">
        <div className="float-left">
          &copy; 2019 example.com
        </div>
        <div className="float-right">
          <img width="48" onClick={this._toggleFullScreen} src={this.props.fullScreen ? FullScreenExitIcon : FullScreenIcon} alt="Fullscreen" />
        </div>
      </div>
    )
  }
}

// map fullScreen property from redux store to props
function mapStateToProps(state) {
  return {
    fullScreen: state.fullScreen
  }
}

// map toggleFullScreen function to props
const mapDispatchToProps = {
  toggleFullScreen
}

// connect redux store to component
export default connect(mapStateToProps, mapDispatchToProps)(Footer);