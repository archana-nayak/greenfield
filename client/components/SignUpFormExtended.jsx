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

        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="age" />

        <label htmlFor="biography">Tell us about yourself?</label>
        <input id="biography" name="biography" type="biography" />

        <label htmlFor="location">Where are you from?</label>
        <input id="location" name="location" type="location" />

        <label htmlFor="file">Upload an image</label>
        <input id="image" name="image" type="file" />

        <button>Create my account!</button>
      </form>
      </div>
    );
  }
}
export default SignUpFormExtended;
