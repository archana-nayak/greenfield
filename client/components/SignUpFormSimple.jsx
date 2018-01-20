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
        <input placeholder="name" id="name" name="name" type="text" />
        <input placeholder="username" id="username" name="username" type="text" />
        <input placeholder="email" id="email" name="email" type="email" />
        <input placeholder="password" id="password" name="password" type="password" />
        <br />
        <button type="submit" name="action">Create my account</button>
      </form>
      </div>
    );
  }
}
export default SignUpFormSimple;
