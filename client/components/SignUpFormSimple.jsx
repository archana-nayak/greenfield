import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/Index.jsx';
import $ from 'jquery';
import { Link } from 'react-router-dom';
class SignUpFormSimple extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <form action = '/signup' method='post'>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />

        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />

        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />

        <button type="submit" name="action">Create my account
        </button>
      </form>
      </div>
    );
  }
}
export default SignUpFormSimple;
