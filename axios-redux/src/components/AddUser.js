import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Axioslib from '../lib/axioslib';
import AppContainer from './AppContainer';

const REQUIRED = 'Required';
const MIN = 'Minimum 2 characters required';
const MAX = 'Maximum 20 characters required';
const INVALIDEMAIL = 'Invalid email';

const SignupSchema = Yup.object().shape({
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

class AddUser extends Component {

  _initialValues = { email: '', first_name: '', last_name: '' }

  _handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      const response = await Axioslib.post(`/users`, values);
      console.log(response);
    } catch(e) {
      console.log(e)
    }
    setSubmitting(false);
  }

  _signUpForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    /* and other goodies */
  }) => {
    return (
      <form onSubmit={handleSubmit} className='needs-validation' noValidate>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className={errors.email ? "form-control is-invalid" : "form-control"} name="email"
            id="email" onChange={handleChange} onBlur={handleBlur}
            value={values.email} aria-describedby="emailHelp"
            placeholder="Enter email" required
          />
          <div className="invalid-feedback">{errors.email && touched.email && errors.email}</div>
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" className={errors.first_name ? "form-control is-invalid" : "form-control"} name="first_name"
            id="firstName" onChange={handleChange} onBlur={handleBlur}
            value={values.first_name} placeholder="Enter First Name" min="2" required
          />
          <div className="invalid-feedback">{errors.first_name && touched.first_name && errors.first_name}</div>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" className={errors.last_name ? "form-control is-invalid" : "form-control"} name="last_name"
            id="lastName" onChange={handleChange} onBlur={handleBlur}
            value={values.last_name} placeholder="Enter Last Name" required
          />
          <div className="invalid-feedback">{errors.last_name && touched.last_name && errors.last_name}</div>
        </div>
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">Submit</button>
      </form>
    )
  }

  render() {
    return (
      <AppContainer>
        <div>
          <h1>Add User</h1>
          <Formik initialValues={this._initialValues} validationSchema={SignupSchema} onSubmit={this._handleSubmit}>
            {this._signUpForm}
          </Formik>
        </div>
      </AppContainer>
    )
  }
}

export default AddUser;