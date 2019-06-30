import React, { Component } from 'react';
import Navbar from './Navbar';

class Home extends Component {
  // initialize state values
  state = { keyData: null }

  // keydown event handler
  _handleKeyDown = (e) => {
    this.setState({ keyData: { key: e.key, keyCode: e.keyCode } });
  }

  // run code when component has finished mounting
  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown)
  }
  
  // run code when the component is about to unmount.
  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown)
  }

  render() {
    return (
      <div>
        <Navbar page="home" />
        <h1>Homepage</h1>
        <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
        <div className="text-center">
          <p><strong>Press a key on the keyboard.</strong></p>
          {this.state.keyData &&
            <p>You pressed - Key: <strong>{this.state.keyData.key}</strong>, Key Code: <strong>{this.state.keyData.keyCode}</strong></p>
          }
        </div>
      </div>
    );
  }
}

export default Home;