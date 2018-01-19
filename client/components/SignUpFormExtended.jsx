import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/Index.jsx';
import $ from 'jquery';
import { Link } from 'react-router-dom';
class SignUpFormExtended extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="input-field">
      <form action = '/signup' method='post'>
        <label htmlFor="name"></label>
        <input placeholder="name" name="name" type="text" />

        <label htmlFor="username"></label>
        <input placeholder="username" name="username" type="text" />

        <label htmlFor="email"></label>
        <input placeholder="email" name="email" type="email" />

        <label htmlFor="password"></label>
        <input placeholder="password" name="password" type="password" />

        <label htmlFor="age"></label>
        <input placeholder="age" name="age" type="age" />

        <label htmlFor="biography"></label>
        <input placeholder="tell us about yourself" name="biography" type="biography" />

        <label htmlFor="location"></label>
        <input placeholder="city, state" name="location" type="location" />

        <label></label>
        <input placeholder="image" name="image" type="file" />

        <button>Create my account!</button>
      </form>
      </div>
    );
  }
}
export default SignUpFormExtended;
