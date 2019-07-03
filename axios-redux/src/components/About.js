import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

class About extends Component {
  render() {
    return (
      <div>
        <Navbar page="about" />
        <h1>About page</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <Footer />
      </div>
    );
  }
}

export default About;