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
      $.ajax({
      url: '/logout',
      method: 'POST',
      success: (data) => {
        console.log('success',data)
        if (typeof data.redirect == 'string'){
            window.location = data.redirect
      }
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
      <text style={{display: 'flex', flex: 1, textAlign: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>What's going on tonight</text>
      <Link className="btn" to={{pathname:'/'}}>Home</Link>
      <Link className="btn" to={{pathname:'/login'}}>Login</Link>
      <Link className="btn" to={{pathname:'/signup'}}>Signup</Link>
      </h1>
      <div style={{textAlign: 'center', fontSize: '40px', textDecoration: 'underline'}}><Link to={{pathname: '/'}}>TAKE ME HOME</Link></div>
      </div>
    );
  }
}
export default Logout;
