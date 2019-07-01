import React, { Component } from 'react';
import Navbar from './Navbar';
// import Axioslib from '../lib/axioslib';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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

  _handleSubmit = (e) => {
    e.preventDefault();
  }

  componentDidMount() {
    const user = this.props.users.find(usr => {
      return usr.id === parseInt(this.props.match.params.id)
    });
    this.setState({ user });
  }

  render() {
    if(this.props.users.length === 0) {
      return <Redirect to="/users" />
    }

    return (
      <div>
        <Navbar page="users" />
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(EditUser);