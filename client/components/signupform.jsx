import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/Index.jsx';
import $ from 'jquery';
import { Link } from 'react-router-dom';
class SignUpForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.fetch(data)
  }
  fetch(data){
    $.ajax({
    url: '/signup',
    method: 'POST',
    body: data,
    success: () => {
      console.log('hello')
    },
    error: (error) => {
      console.log('fail safe', error)
    }
  });
  }

  render() {
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
      <form action = '/signup' method='post'>
        <label htmlFor="name">Enter in your name</label>
        <input id="name" name="name" type="text" />

        <label htmlFor="username">Enter a username</label>
        <input id="username" name="username" type="text" />

        <label htmlFor="email">Enter a valid email</label>
        <input id="email" name="email" type="email" />


        <label htmlFor="password">Enter a password</label>
        <input id="password" name="password" type="password" />

        <button>Create my account!</button>
      </form>
      </div>
    );
  }
}
export default SignUpForm;
