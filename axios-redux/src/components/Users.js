import React, { Component } from 'react';
import Navbar from './Navbar';
import Axioslib from '../lib/axioslib';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateState } from '../store/actions';

class Users extends Component {

  async getUsers(page) {
    try {
      const response = await Axioslib(`/users?page=${page}`);
      if(response.data.data) {
        this.props.updateState({ users: response.data.data });
      }
    } catch(e) {
      console.log(e)
    }
  }

  listUsers() {
    return this.props.users.map(user => {
      return (
        <tr key={user.id}>
          <td><img src={user.avatar} alt="Avatar" /></td>
          <td>{user.first_name+' '+user.last_name}</td>
          <td>{user.email}</td>
          <td><Link className="btn btn-primary btn-sm" to={`/user/${user.id}`}>Edit</Link></td>
        </tr>
      )
    })
  }

  componentDidMount() {
    this.getUsers(1);
  }

  render() {
    return (
      <div>
        <Navbar page="users" />
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
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  updateState
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);