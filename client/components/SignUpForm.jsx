import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/Index.jsx';
import SignUpFormSimple from '../components/SignUpFormSimple.jsx';
import SignUpFormExtended from '../components/SignUpFormExtended.jsx';
import $ from 'jquery';
import { Link } from 'react-router-dom';
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showExtended: false,
      showSimple: true,
      displayText: true,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClickTwo = this.handleClickTwo.bind(this);
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
      showSimple: !this.state.showSimple,
      showExtended: !this.state.showExtended,
      displayText: !this.state.displayText
    })
  }
  handleClickTwo() {
    this.setState({
      showSimple: !this.state.showSimple,
      showExtended: !this.state.showExtended,
      displayText: !this.state.displayText
    })
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
      <button className="btn" onClick={this.handleClickTwo}>Simple signup </button>
      <button className="btn" onClick={this.handleClick}>Create a profile with it!</button>
      {this.state.showExtended ? <SignUpFormExtended/>  : null}
      {this.state.showSimple ? <SignUpFormSimple/> : null}
      </div>
    );
  }
}
export default SignUpForm;
