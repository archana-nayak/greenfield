import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/login.jsx';
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);

  }
  onChange(e){
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
  }
  render() {
    const { username, password} = this.state;
    return (
      <div>
      <h1 style={{display: 'flex'}}>
      <img src='https://n6-img-fp.akamaized.net/free-icon/telegram-logo_318-102687.jpg?size=338c&ext=jpg' width="30" height="50"/>
      <text style={{display: 'flex', flex: 1, textAlign: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>our app</text>
      <Link className="btn" to={{pathname:'/'}}>home</Link>
      <Link className="btn" to={{pathname:'/login'}}>login</Link>
      <Link className="btn" to={{pathname:'/signup'}}>signup</Link>
      <Link className="btn" to={{pathname:'/profile'}}>My Profile</Link>
      </h1>
      <form action='/auth' method='post'>
        <label htmlFor="username">Enter your username</label>
        <input type="text" name="username" value={username} onChange={this.onChange} />
        <label htmlFor="password">Enter your password</label>
        <input type="password" name="password" value={password} onChange={this.onChange} />
        <button>Login!</button>
      </form>
      </div>
    );
  }
}
export default LoginForm;
