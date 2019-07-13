import React, { Component } from 'react';
import Axioslib from '../lib/axioslib';
import { Link } from 'react-router-dom';

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

  _handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => {
      return { user: { ...prevState.user, [name]: value } }
    })
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
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/users">Users</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Edit User</li>
          </ol>
        </nav>
        <h1>Edit User</h1>
        <form onSubmit={this._handleSubmit}>
          <div className="form-group text-center">
            <img src={this.state.user.avatar} alt="Avatar" />
          </div>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="first_name" onChange={this._handleChange} value={this.state.user.first_name} className="form-control" id="firstname" placeholder="First Name" />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" name="last_name" onChange={this._handleChange} value={this.state.user.last_name} className="form-control" id="lastname" placeholder="Last Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" name="email" onChange={this._handleChange} value={this.state.user.email} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default EditUser;