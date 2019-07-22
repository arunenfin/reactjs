import React, { Component } from 'react';
import Axioslib from '../lib/axioslib';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';

class Users extends Component {

  state = { users: [] }

  async getUsers(page) {
    try {
      const response = await Axioslib(`/users?page=${page}`);
      if (response.data.data) {
        this.setState({ users: response.data.data });
      }
    } catch (e) {
      console.log(e)
    }
  }

  listUsers() {
    if (this.state.users.length === 0) {
      return <tr><td colSpan="4" className="text-center">Loading...</td></tr>
    }

    return this.state.users.map(user => {
      return (
        <tr key={user.id}>
          <td><img src={user.avatar} alt="Avatar" /></td>
          <td>{user.first_name + ' ' + user.last_name}</td>
          <td>{user.email}</td>
          <td><Link className="btn btn-primary btn-sm" to={`/users/edit/${user.id}`}>Edit</Link></td>
        </tr>
      )
    });
  }

  componentDidMount() {
    this.getUsers(1);
  }

  render() {
    return (
      <AppContainer>
        <div>
          <h1>Users list</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {this.listUsers()}
            </tbody>
          </table>
        </div>
      </AppContainer>
    );
  }
}

export default Users;