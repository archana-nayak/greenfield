import React from 'react';
import ReactDOM from 'react-dom';
import FirstPage from './FirstPage.jsx';
import Index from './Index.jsx';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }
  componentDidMount() {
      console.log('im in fetching?')
      $.ajax({
      url: '/logout',
      method: 'POST',
      success: () => {
        console.log('hello');

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
      <Link to={{pathname: '/'}}>TAKE ME HOME</Link>
      </div>
    );
  }
}
export default Logout;
