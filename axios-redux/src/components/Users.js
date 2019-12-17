import React, { Component } from 'react';
import Axioslib from '../lib/axioslib';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppContainer from './AppContainer';
import { addUsers } from '../store/actions';

class Users extends Component {

  async getUsers(page) {
    try {
      const response = await Axioslib(`/users?page=${page}`);
      // response.data.data contains array of users
      if (response.data.data) {
        this.props.addUsers(response.data.data);
      }
    } catch (e) {
      console.log(e)
    }
  }

  listUsers() {
    if (this.props.users.length === 0) {
      return <tr><td colSpan="4" className="text-center">Loading...</td></tr>
    }

    return this.props.users.map(user => {
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

// map sidebarOpen property from redux store to props
function mapStateToProps(state) {
  return {
    users: state.users
  }
}

// map toggleSidebar function to props
const mapDispatchToProps = {
  addUsers: addUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);