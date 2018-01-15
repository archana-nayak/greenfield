import React from 'react';
import ReactDOM from 'react-dom';
import FirstPage from './FirstPage.jsx';
import Index from './Index.jsx';
import { Link } from 'react-router-dom';
const Profile = (props) => (

  <div>
  <h1 style={{display: 'flex'}}>
  <img src='https://n6-img-fp.akamaized.net/free-icon/telegram-logo_318-102687.jpg?size=338c&ext=jpg' width="30" height="50"/>
  <text style={{display: 'flex', flex: 1, textAlign: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>our app</text>
  <Link className="btn" to={{pathname:'/'}}>home</Link>
  <Link className="btn" to={{pathname:'/login'}}>login</Link>
  <Link className="btn" to={{pathname:'/signup'}}>signup</Link>
  <Link className="btn" to={{pathname:'/profile'}}>My Profile</Link>
  </h1>
  </div>
)

export default Profile;
