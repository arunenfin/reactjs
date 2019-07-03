import React, { Component } from 'react';
import Navbar from './Navbar';
import Axioslib from '../lib/axioslib';
import { Link } from 'react-router-dom';
import Footer from './Footer';

class EditUser extends Component {

  state = {
    user: {
      id: 0,
      email: "",
      first_name: "",
      last_name: "",
      avatar: ""
    }
  }

  async getUser(id) {
    try {
      const response = await Axioslib(`/users/${id}`);
      if(response.data.data) {
        this.setState({ user: response.data.data });
      }
    } catch(e) {
      console.log(e)
    }
  }

  _handleSubmit = (e) => {
    e.preventDefault();
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <Navbar page="users" />
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="/users">Users</Link></li>
            <li class="breadcrumb-item active" aria-current="page">Edit User</li>
          </ol>
        </nav>
        <h1>Edit User</h1>
        <form onSubmit={this._handleSubmit}>
          <div className="form-group text-center">
            <img src={this.state.user.avatar} alt="Avatar" />
          </div>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input type="text" readOnly value={this.state.user.first_name} className="form-control" id="firstname" placeholder="First Name" />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" readOnly value={this.state.user.last_name} className="form-control" id="lastname" placeholder="Last Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" readOnly value={this.state.user.email} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Footer />
      </div>
    );
  }
}

export default EditUser;