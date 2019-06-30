import React, { Component } from 'react';
import Navbar from './Navbar';

class About extends Component {
  // initialize state values
  state = { name: "", showContent: false }

  // Name change handler
  _handleNameChange = (e) => {
    const name = (e.target.value).trim();
    this.setState({ name: name });
  }

  // button click handler
  _handleToggleContent = (e) => {
    this.setState((prevState) => {
      return { showContent: !prevState.showContent }
    });
  }

  render() {
    return (
      <div>
        <Navbar page="about" />
        <h1>About page</h1>
        <p>
          <button type="button" onClick={this._handleToggleContent}>
            {this.state.showContent ? "Hide" : "Show"} Content
          </button>
        </p>

        {this.state.showContent && 
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        }

        <p>
          {this.state.name ? `Your name is ${this.state.name}` : "Please enter a name."} 
        </p>
        <p>
          <input type="text" placeholder="Enter your name" onChange={this._handleNameChange} />
        </p>
      </div>
    );
  }
}

export default About;