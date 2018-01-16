import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/Index.jsx';
import $ from 'jquery';
import { Link } from 'react-router-dom';
class SignUpFormExtended extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
    this.handleClick = this.handleClick.bind(this);
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
  handleClick() {
    this.setState({
      showForm: true
    })
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
