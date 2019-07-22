import React, { Component } from 'react';
import Axioslib from '../lib/axioslib';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import AppContainer from './AppContainer';

const REQUIRED = 'Required';
const MIN = 'Minimum 2 characters required';
const MAX = 'Maximum 20 characters required';
const INVALIDEMAIL = 'Invalid email';

const EditSchema = Yup.object().shape({
  email: Yup.string()
    .email(INVALIDEMAIL)
    .required(REQUIRED),
  first_name: Yup.string()
    .required(REQUIRED)
    .min(2, MIN)
    .max(20, MAX),
  last_name: Yup.string()
    .required(REQUIRED)
    .min(2, MIN)
    .max(20, MAX),
});

class EditUser extends Component {

  state = {
    user: {
      id: 0,
      email: "",
      first_name: "",
      last_name: "",
      avatar: ""
    },
    errors: {},
    formValid: true,
    formSubmitted: false
  }

  async getUser(id) {
    try {
      const response = await Axioslib(`/users/${id}`);
      if (response.data.data) {
        this.setState({ user: response.data.data }, this._validateForm);
      }
    } catch (e) {
      console.log(e)
    }
  }

  // this method is called after state is updated in the _handleChange method
  _validateForm = async () => {
    try {
      const { email, first_name, last_name } = this.state.user;
      await EditSchema.validate({ email, first_name, last_name }, { abortEarly: false });

      this.setState({ errors: {}, formValid: true })
    } catch (e) {
      let errors = {};
      for (let i = 0; i < e.inner.length; i++) {
        const eInner = e.inner[i];
        errors[eInner.path] = eInner.message;
      }

      this.setState({ errors: errors, formValid: false })
    }
  }

  _handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => {
      return { user: { ...prevState.user, [name]: value } }
    }, this._validateForm)
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ formSubmitted: true })
    if (this.state.formValid) {
      // save data using axios request
    }
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  render() {
    return (
      <AppContainer>
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
              <input type="text" name="first_name" onChange={this._handleChange} value={this.state.user.first_name} className={(this.state.formSubmitted && this.state.errors.first_name) ? "form-control is-invalid" : "form-control"} id="firstname" placeholder="First Name" />
              <div className="invalid-feedback">{this.state.formSubmitted && this.state.errors.first_name}</div>
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" name="last_name" onChange={this._handleChange} value={this.state.user.last_name} className={(this.state.formSubmitted && this.state.errors.last_name) ? "form-control is-invalid" : "form-control"} id="lastname" placeholder="Last Name" />
              <div className="invalid-feedback">{this.state.formSubmitted && this.state.errors.last_name}</div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" onChange={this._handleChange} value={this.state.user.email} className={(this.state.formSubmitted && this.state.errors.email) ? "form-control is-invalid" : "form-control"} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
              <div className="invalid-feedback">{this.state.formSubmitted && this.state.errors.email}</div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </AppContainer>
    );
  }
}

export default EditUser;